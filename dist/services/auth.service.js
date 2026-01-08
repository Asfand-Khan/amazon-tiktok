import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { SessionRepository } from '../repositories/session.repository.js';
import { UserRepository } from '@/repositories/user.repository.js';
import { AppError } from '@/utils/AppError.js';
const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const getExpiresAt = (expiresIn) => {
    const amount = parseInt(expiresIn) || 90;
    const unit = expiresIn.slice(-1);
    const now = new Date();
    if (unit === 'd')
        now.setDate(now.getDate() + amount);
    else if (unit === 'h')
        now.setHours(now.getHours() + amount);
    else if (unit === 'm')
        now.setMinutes(now.getMinutes() + amount);
    else
        now.setDate(now.getDate() + amount);
    return now;
};
export class AuthService {
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError('Email already in use', 400);
        }
        const { rights, ...userData } = data;
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        const newUser = await userRepository.create({
            ...userData,
            password: hashedPassword,
            userMenuRights: rights
                ? {
                    create: rights.map((right) => ({
                        menu: { connect: { id: right.menuId } },
                        canView: right.canView,
                        canCreate: right.canCreate,
                        canEdit: right.canEdit,
                        canDelete: right.canDelete,
                    })),
                }
                : undefined,
        });
        return {
            id: newUser.id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            role: newUser.role,
            status: newUser.status,
            emailVerified: newUser.emailVerified,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            lastLoginAt: newUser.lastLoginAt,
        };
    }
    async login(data, metadata) {
        const { email, password } = data;
        if (!email || !password) {
            throw new AppError('Please provide email and password!', 400);
        }
        const user = await userRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Incorrect email or password', 401);
        }
        const fullUser = (await userRepository.findById(user.id));
        const menus = this.buildMenuTree(fullUser?.userMenuRights || []);
        const token = signToken(user.id);
        await sessionRepository
            .deleteExpired()
            .catch((err) => console.error('Error cleaning up sessions:', err));
        const expiresIn = process.env.JWT_EXPIRES_IN || '90d';
        await sessionRepository.create({
            userId: user.id,
            token,
            expiresAt: getExpiresAt(expiresIn),
            ipAddress: metadata.ipAddress,
            userAgent: metadata.userAgent,
        });
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token, menus };
    }
    async logout(token) {
        await sessionRepository.deleteByToken(token);
    }
    buildMenuTree(userMenuRights) {
        const nodes = userMenuRights
            .map((umr) => ({
            id: umr.menu.id,
            parentId: umr.menu.parentId,
            name: umr.menu.name,
            url: umr.menu.url,
            icon: umr.menu.icon,
            sorting: umr.menu.sorting,
            isActive: umr.menu.isActive,
            rights: {
                view: umr.canView,
                create: umr.canCreate,
                edit: umr.canEdit,
                delete: umr.canDelete,
            },
            children: [],
        }))
            .filter((node) => node.isActive && node.rights.view)
            .sort((a, b) => a.sorting - b.sorting);
        const tree = [];
        const nodeMap = new Map();
        nodes.forEach((node) => {
            nodeMap.set(node.id, node);
        });
        nodes.forEach((node) => {
            if (node.parentId && nodeMap.has(node.parentId)) {
                nodeMap.get(node.parentId).children.push(node);
            }
            else {
                tree.push(node);
            }
        });
        return tree;
    }
}
//# sourceMappingURL=auth.service.js.map
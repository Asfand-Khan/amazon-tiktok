import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginInput, RegisterInput } from '@/validations/auth.validation.js';
import { SessionRepository } from '../repositories/session.repository.js';
import { UserRepository } from '@/repositories/user.repository.js';
import { AppError } from '@/utils/AppError.js';

const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();

const signToken = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN!,
  } as jwt.SignOptions);
};

const getExpiresAt = (expiresIn: string) => {
  const amount = parseInt(expiresIn) || 90;
  const unit = expiresIn.slice(-1);
  const now = new Date();
  if (unit === 'd') now.setDate(now.getDate() + amount);
  else if (unit === 'h') now.setHours(now.getHours() + amount);
  else if (unit === 'm') now.setMinutes(now.getMinutes() + amount);
  else now.setDate(now.getDate() + amount);
  return now;
};

export class AuthService {
  async register(data: RegisterInput['body']) {
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
            create: rights.map((right: any) => ({
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

  async login(
    data: LoginInput['body'],
    metadata: { ipAddress?: string; userAgent?: string }
  ) {
    const { email, password } = data;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new AppError('Please provide email and password!', 400);
    }

    // 2) Check if user exists && password is correct
    const user = await userRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new AppError('Incorrect email or password', 401);
    }

    // 3) Get full user details with menu rights
    const fullUser = (await userRepository.findById(user.id)) as any;

    // 4) Build menu tree
    const menus = this.buildMenuTree(fullUser?.userMenuRights || []);

    // 5) If everything ok, send token to client
    const token = signToken(user.id);

    // 6) Cleanup expired sessions (Optional but good practice)
    await sessionRepository
      .deleteExpired()
      .catch((err) => console.error('Error cleaning up sessions:', err));

    // 7) Create session in DB
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

  async logout(token: string) {
    await sessionRepository.deleteByToken(token);
  }

  private buildMenuTree(userMenuRights: any[]) {
    // 1. Map to simpler objects and filter
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
      .filter((node) => node.isActive && node.rights.view) // Show only active and viewable
      .sort((a: any, b: any) => a.sorting - b.sorting);

    // 2. Build Tree
    const tree: any[] = [];
    const nodeMap = new Map();

    // Initialize map
    nodes.forEach((node) => {
      nodeMap.set(node.id, node);
    });

    // Link children to parents
    nodes.forEach((node) => {
      if (node.parentId && nodeMap.has(node.parentId)) {
        nodeMap.get(node.parentId).children.push(node);
      } else {
        tree.push(node);
      }
    });

    return tree;
  }
}

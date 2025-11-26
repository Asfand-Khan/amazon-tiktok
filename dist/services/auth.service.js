import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
const userRepository = new UserRepository();
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '90d',
    });
};
export class AuthService {
    async register(data) {
        const existingUser = await userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError('Email already in use', 400);
        }
        const hashedPassword = await bcrypt.hash(data.password, 12);
        const newUser = await userRepository.create({
            ...data,
            password: hashedPassword,
        });
        const token = signToken(newUser.id);
        const { password, ...userWithoutPassword } = newUser;
        return { user: userWithoutPassword, token };
    }
    async login(data) {
        const { email, password } = data;
        if (!email || !password) {
            throw new AppError('Please provide email and password!', 400);
        }
        const user = await userRepository.findByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new AppError('Incorrect email or password', 401);
        }
        const token = signToken(user.id);
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }
}
//# sourceMappingURL=auth.service.js.map
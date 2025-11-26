import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const userRepository = new UserRepository();

const signToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  } as jwt.SignOptions);
};

export class AuthService {
  async register(data: Prisma.UserCreateInput) {
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
    // Remove password from output
    const { password, ...userWithoutPassword } = newUser;

    return { user: userWithoutPassword, token };
  }

  async login(data: Pick<Prisma.UserCreateInput, 'email' | 'password'>) {
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

    // 3) If everything ok, send token to client
    const token = signToken(user.id);
    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }
}

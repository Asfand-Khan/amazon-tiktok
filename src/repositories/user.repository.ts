import { Prisma, User } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class UserRepository {
  async create(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
      include: {
        userMenuRights: {
          include: { menu: true },
        },
      },
    });
  }

  async findAll(where: Prisma.UserWhereInput = {}): Promise<User[]> {
    return prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: {
        userMenuRights: {
          include: { menu: true },
        },
      },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
      include: {
        userMenuRights: {
          include: { menu: true },
        },
      },
    });
  }

  async delete(id: number): Promise<User> {
    return prisma.user.delete({ where: { id } });
  }
}

import { Session, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class SessionRepository {
  async create(data: Prisma.SessionUncheckedCreateInput): Promise<Session> {
    return prisma.session.create({
      data,
    });
  }

  async findByToken(token: string): Promise<Session | null> {
    return prisma.session.findUnique({
      where: { token },
      include: {
        user: true,
      },
    });
  }

  async deleteByToken(token: string): Promise<void> {
    await prisma.session.deleteMany({
      where: { token },
    });
  }

  async deleteExpired(): Promise<void> {
    await prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  async deleteByUserId(userId: number): Promise<void> {
    await prisma.session.deleteMany({
      where: { userId },
    });
  }
}

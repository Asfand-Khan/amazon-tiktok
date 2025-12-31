import { ActivityLog, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class ActivityLogRepository {
  async create(data: Prisma.ActivityLogCreateInput): Promise<ActivityLog> {
    return prisma.activityLog.create({ data });
  }

  async findAll(
    filter: Prisma.ActivityLogWhereInput = {}
  ): Promise<ActivityLog[]> {
    return prisma.activityLog.findMany({
      where: filter,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async findById(id: number): Promise<ActivityLog | null> {
    return prisma.activityLog.findUnique({ where: { id } });
  }
}

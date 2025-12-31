import { Notification, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class NotificationRepository {
  async create(data: Prisma.NotificationCreateInput): Promise<Notification> {
    return prisma.notification.create({ data });
  }

  async findAllByUserId(
    userId: number,
    filter: Prisma.NotificationWhereInput = {}
  ): Promise<Notification[]> {
    return prisma.notification.findMany({
      where: {
        ...filter,
        userId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Notification | null> {
    return prisma.notification.findUnique({ where: { id } });
  }

  async update(
    id: number,
    data: Prisma.NotificationUpdateInput
  ): Promise<Notification> {
    return prisma.notification.update({
      where: { id },
      data,
    });
  }

  async markAllAsRead(userId: number): Promise<Prisma.BatchPayload> {
    return prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });
  }
}

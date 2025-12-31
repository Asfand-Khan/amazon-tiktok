import { NotificationRepository } from '../repositories/notification.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const notificationRepository = new NotificationRepository();

export class NotificationService {
  async createNotification(data: Prisma.NotificationCreateInput) {
    return notificationRepository.create(data);
  }

  async getMyNotifications(userId: number, unreadOnly: boolean = false) {
    const filter: Prisma.NotificationWhereInput = unreadOnly
      ? { isRead: false }
      : {};
    return notificationRepository.findAllByUserId(userId, filter);
  }

  async markAsRead(id: number, userId: number) {
    const notification = await notificationRepository.findById(id);
    if (!notification) {
      throw new AppError('Notification not found', 404);
    }
    if (notification.userId !== userId) {
      throw new AppError('Not authorized', 403);
    }
    return notificationRepository.update(id, {
      isRead: true,
      readAt: new Date(),
    });
  }

  async markAllAsRead(userId: number) {
    return notificationRepository.markAllAsRead(userId);
  }
}

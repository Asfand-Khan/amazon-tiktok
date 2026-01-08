import { NotificationRepository } from '../repositories/notification.repository.js';
import { AppError } from '../utils/AppError.js';
const notificationRepository = new NotificationRepository();
export class NotificationService {
    async createNotification(data) {
        return notificationRepository.create(data);
    }
    async getMyNotifications(userId, unreadOnly = false) {
        const filter = unreadOnly
            ? { isRead: false }
            : {};
        return notificationRepository.findAllByUserId(userId, filter);
    }
    async markAsRead(id, userId) {
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
    async markAllAsRead(userId) {
        return notificationRepository.markAllAsRead(userId);
    }
}
//# sourceMappingURL=notification.service.js.map
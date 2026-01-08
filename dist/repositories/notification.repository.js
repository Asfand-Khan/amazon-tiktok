import { prisma } from '../lib/db.js';
export class NotificationRepository {
    async create(data) {
        return prisma.notification.create({ data });
    }
    async findAllByUserId(userId, filter = {}) {
        return prisma.notification.findMany({
            where: {
                ...filter,
                userId,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return prisma.notification.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma.notification.update({
            where: { id },
            data,
        });
    }
    async markAllAsRead(userId) {
        return prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true, readAt: new Date() },
        });
    }
}
//# sourceMappingURL=notification.repository.js.map
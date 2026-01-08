import { prisma } from '../lib/db.js';
export class SubscriptionRepository {
    async create(data) {
        return prisma.subscription.create({ data });
    }
    async findAll(filter = {}) {
        return prisma.subscription.findMany({
            where: filter,
            include: {
                plan: true,
                client: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return prisma.subscription.findUnique({
            where: { id },
            include: {
                plan: true,
                client: true,
            },
        });
    }
    async findActiveByClientId(clientId) {
        return prisma.subscription.findFirst({
            where: {
                clientId,
                status: 'ACTIVE',
                OR: [
                    { endDate: { gte: new Date() } },
                    { endDate: null },
                ],
            },
            include: {
                plan: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async update(id, data) {
        return prisma.subscription.update({
            where: { id },
            data,
        });
    }
}
//# sourceMappingURL=subscription.repository.js.map
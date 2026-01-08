import { prisma } from '../lib/db.js';
export class ActivityLogRepository {
    async create(data) {
        return prisma.activityLog.create({ data });
    }
    async findAll(filter = {}) {
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
    async findById(id) {
        return prisma.activityLog.findUnique({ where: { id } });
    }
}
//# sourceMappingURL=activityLog.repository.js.map
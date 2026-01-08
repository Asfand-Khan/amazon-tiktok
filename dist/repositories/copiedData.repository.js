import { prisma } from '../lib/db.js';
export class CopiedDataRepository {
    async create(data) {
        return prisma.copiedData.create({ data });
    }
    async findAllByClientId(clientId, filter = {}) {
        return prisma.copiedData.findMany({
            where: {
                ...filter,
                clientId,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return prisma.copiedData.findUnique({
            where: { id },
            include: {
                client: true,
            },
        });
    }
    async update(id, data) {
        return prisma.copiedData.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma.copiedData.delete({ where: { id } });
    }
}
//# sourceMappingURL=copiedData.repository.js.map
import { prisma } from '../lib/db.js';
export class ClientRepository {
    async create(data) {
        return prisma.client.create({ data });
    }
    async findAll() {
        return prisma.client.findMany({
            include: { user: true },
        });
    }
    async findByUserId(userId) {
        return prisma.client.findUnique({ where: { userId } });
    }
    async findByApiKey(apiKey) {
        return prisma.client.findUnique({ where: { apiKey } });
    }
    async findById(id) {
        return prisma.client.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma.client.update({ where: { id }, data });
    }
    async delete(id) {
        return prisma.client.delete({ where: { id } });
    }
}
//# sourceMappingURL=client.repository.js.map
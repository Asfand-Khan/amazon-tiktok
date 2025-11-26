import { prisma } from '../lib/db.js';
export class ClientRepository {
    async create(data) {
        return prisma.client.create({ data });
    }
    async findByUserId(userId) {
        return prisma.client.findUnique({ where: { userId } });
    }
    async findByApiKey(apiKey) {
        return prisma.client.findUnique({ where: { apiKey } });
    }
    async update(id, data) {
        return prisma.client.update({ where: { id }, data });
    }
}
//# sourceMappingURL=client.repository.js.map
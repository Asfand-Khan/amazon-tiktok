import { prisma } from '../lib/db.js';
export class ContentRepository {
    async create(data) {
        return prisma.content.create({ data });
    }
    async findAll(filter = {}) {
        return prisma.content.findMany({
            where: filter,
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findById(id) {
        return prisma.content.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma.content.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma.content.delete({ where: { id } });
    }
}
//# sourceMappingURL=content.repository.js.map
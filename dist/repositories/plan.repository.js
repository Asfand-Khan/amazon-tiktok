import { prisma } from '../lib/db.js';
export class PlanRepository {
    async create(data) {
        return prisma.plan.create({ data });
    }
    async findAll(filter = {}) {
        return prisma.plan.findMany({
            where: filter,
            orderBy: { sortOrder: 'asc' },
        });
    }
    async findById(id) {
        return prisma.plan.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma.plan.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return prisma.plan.delete({ where: { id } });
    }
}
//# sourceMappingURL=plan.repository.js.map
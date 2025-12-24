import { prisma } from '../lib/db.js';
export class MenuRepository {
    async create(data) {
        return prisma.menu.create({ data });
    }
    async findAll(where = {}) {
        return prisma.menu.findMany({
            where: { ...where, isDeleted: false },
            orderBy: { sorting: 'asc' },
            include: {
                children: {
                    where: { isDeleted: false },
                    orderBy: { sorting: 'asc' },
                    include: {
                        children: {
                            where: { isDeleted: false },
                            orderBy: { sorting: 'asc' },
                        },
                    },
                },
            },
        });
    }
    async findById(id) {
        return prisma.menu.findUnique({
            where: { id },
            include: {
                children: {
                    where: { isDeleted: false },
                },
            },
        });
    }
    async update(id, data) {
        return prisma.menu.update({ where: { id }, data });
    }
    async delete(id, deletedBy) {
        return prisma.menu.update({
            where: { id },
            data: {
                isDeleted: true,
                deletedAt: new Date(),
                deletedBy,
            },
        });
    }
}
//# sourceMappingURL=menu.repository.js.map
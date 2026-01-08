import { prisma } from '../lib/db.js';
export class UserRepository {
    async create(data) {
        return prisma.user.create({
            data,
            include: {
                userMenuRights: {
                    include: { menu: true },
                },
            },
        });
    }
    async findAll(where = {}) {
        return prisma.user.findMany({
            where,
            orderBy: { createdAt: 'desc' },
        });
    }
    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return prisma.user.findUnique({
            where: { id },
            include: {
                userMenuRights: {
                    include: { menu: true },
                },
            },
        });
    }
    async update(id, data) {
        return prisma.user.update({
            where: { id },
            data,
            include: {
                userMenuRights: {
                    include: { menu: true },
                },
            },
        });
    }
    async delete(id) {
        return prisma.user.delete({ where: { id } });
    }
}
//# sourceMappingURL=user.repository.js.map
import { prisma } from '../lib/db.js';
export class UserRepository {
    async create(data) {
        return prisma.user.create({ data });
    }
    async findByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return prisma.user.findUnique({ where: { id } });
    }
    async update(id, data) {
        return prisma.user.update({ where: { id }, data });
    }
}
//# sourceMappingURL=user.repository.js.map
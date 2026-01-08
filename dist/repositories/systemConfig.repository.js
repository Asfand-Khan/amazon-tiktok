import { prisma } from '../lib/db.js';
export class SystemConfigRepository {
    async create(data) {
        return prisma.systemConfig.create({ data });
    }
    async findAll() {
        return prisma.systemConfig.findMany();
    }
    async findByKey(key) {
        return prisma.systemConfig.findUnique({ where: { key } });
    }
    async update(key, value) {
        return prisma.systemConfig.update({
            where: { key },
            data: { value },
        });
    }
}
//# sourceMappingURL=systemConfig.repository.js.map
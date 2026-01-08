import { prisma } from '../lib/db.js';
export class EmailTemplateRepository {
    async create(data) {
        return prisma.emailTemplate.create({ data });
    }
    async findAll() {
        return prisma.emailTemplate.findMany();
    }
    async findById(id) {
        return prisma.emailTemplate.findUnique({ where: { id } });
    }
    async findByType(type) {
        return prisma.emailTemplate.findUnique({ where: { type } });
    }
    async update(id, data) {
        return prisma.emailTemplate.update({
            where: { id },
            data,
        });
    }
}
//# sourceMappingURL=emailTemplate.repository.js.map
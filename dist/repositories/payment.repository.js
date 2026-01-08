import { prisma } from '../lib/db.js';
export class PaymentRepository {
    async create(data) {
        return prisma.payment.create({ data });
    }
    async findAll(filter = {}) {
        return prisma.payment.findMany({
            where: filter,
            include: {
                client: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findById(id) {
        return prisma.payment.findUnique({
            where: { id },
            include: {
                client: true,
            },
        });
    }
    async update(id, data) {
        return prisma.payment.update({
            where: { id },
            data,
        });
    }
}
//# sourceMappingURL=payment.repository.js.map
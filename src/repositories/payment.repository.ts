import { Payment, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class PaymentRepository {
  async create(data: Prisma.PaymentCreateInput): Promise<Payment> {
    return prisma.payment.create({ data });
  }

  async findAll(filter: Prisma.PaymentWhereInput = {}): Promise<Payment[]> {
    return prisma.payment.findMany({
      where: filter,
      include: {
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Payment | null> {
    return prisma.payment.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
  }

  async update(id: number, data: Prisma.PaymentUpdateInput): Promise<Payment> {
    return prisma.payment.update({
      where: { id },
      data,
    });
  }
}

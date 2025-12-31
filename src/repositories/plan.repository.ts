import { Plan, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class PlanRepository {
  async create(data: Prisma.PlanCreateInput): Promise<Plan> {
    return prisma.plan.create({ data });
  }

  async findAll(filter: Prisma.PlanWhereInput = {}): Promise<Plan[]> {
    return prisma.plan.findMany({
      where: filter,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findById(id: number): Promise<Plan | null> {
    return prisma.plan.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.PlanUpdateInput): Promise<Plan> {
    return prisma.plan.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Plan> {
    return prisma.plan.delete({ where: { id } });
  }
}

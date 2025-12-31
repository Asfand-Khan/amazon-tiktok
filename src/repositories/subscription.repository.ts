import { Subscription, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class SubscriptionRepository {
  async create(data: Prisma.SubscriptionCreateInput): Promise<Subscription> {
    return prisma.subscription.create({ data });
  }

  async findAll(
    filter: Prisma.SubscriptionWhereInput = {}
  ): Promise<Subscription[]> {
    return prisma.subscription.findMany({
      where: filter,
      include: {
        plan: true,
        client: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<Subscription | null> {
    return prisma.subscription.findUnique({
      where: { id },
      include: {
        plan: true,
        client: true,
      },
    });
  }

  async findActiveByClientId(clientId: number): Promise<Subscription | null> {
    return prisma.subscription.findFirst({
      where: {
        clientId,
        status: 'ACTIVE',
        OR: [
          { endDate: { gte: new Date() } },
          { endDate: null }, // Lifetime or indefinite
        ],
      },
      include: {
        plan: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(
    id: number,
    data: Prisma.SubscriptionUpdateInput
  ): Promise<Subscription> {
    return prisma.subscription.update({
      where: { id },
      data,
    });
  }
}

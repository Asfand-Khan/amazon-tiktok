import { Client, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class ClientRepository {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return prisma.client.create({ data });
  }

  async findByUserId(userId: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { userId } });
  }

  async findByApiKey(apiKey: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { apiKey } });
  }

  async update(id: string, data: Prisma.ClientUpdateInput): Promise<Client> {
    return prisma.client.update({ where: { id }, data });
  }
}

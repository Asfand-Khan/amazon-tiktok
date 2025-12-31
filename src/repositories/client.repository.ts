import { Client, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class ClientRepository {
  async create(data: Prisma.ClientCreateInput): Promise<Client> {
    return prisma.client.create({ data });
  }

  async findAll(): Promise<Client[]> {
    return prisma.client.findMany({
      include: { user: true },
    });
  }

  async findByUserId(userId: number): Promise<Client | null> {
    return prisma.client.findUnique({ where: { userId } });
  }

  async findByApiKey(apiKey: string): Promise<Client | null> {
    return prisma.client.findUnique({ where: { apiKey } });
  }

  async findById(id: number): Promise<Client | null> {
    return prisma.client.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ClientUpdateInput): Promise<Client> {
    return prisma.client.update({ where: { id }, data });
  }

  async delete(id: number): Promise<Client> {
    return prisma.client.delete({ where: { id } });
  }
}

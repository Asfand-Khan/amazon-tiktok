import { CopiedData, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class CopiedDataRepository {
  async create(data: Prisma.CopiedDataCreateInput): Promise<CopiedData> {
    return prisma.copiedData.create({ data });
  }

  async findAllByClientId(
    clientId: number,
    filter: Prisma.CopiedDataWhereInput = {}
  ): Promise<CopiedData[]> {
    return prisma.copiedData.findMany({
      where: {
        ...filter,
        clientId,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findById(id: number): Promise<CopiedData | null> {
    return prisma.copiedData.findUnique({
      where: { id },
      include: {
        client: true,
      },
    });
  }

  async update(
    id: number,
    data: Prisma.CopiedDataUpdateInput
  ): Promise<CopiedData> {
    return prisma.copiedData.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<CopiedData> {
    return prisma.copiedData.delete({ where: { id } });
  }
}

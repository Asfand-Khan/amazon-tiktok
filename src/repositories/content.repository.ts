import { Content, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class ContentRepository {
  async create(data: Prisma.ContentCreateInput): Promise<Content> {
    return prisma.content.create({ data });
  }

  async findAll(filter: Prisma.ContentWhereInput = {}): Promise<Content[]> {
    return prisma.content.findMany({
      where: filter,
      orderBy: { sortOrder: 'asc' },
    });
  }

  async findById(id: number): Promise<Content | null> {
    return prisma.content.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.ContentUpdateInput): Promise<Content> {
    return prisma.content.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<Content> {
    return prisma.content.delete({ where: { id } });
  }
}

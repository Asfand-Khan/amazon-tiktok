import { Menu, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class MenuRepository {
  async create(data: Prisma.MenuCreateInput): Promise<Menu> {
    return prisma.menu.create({ data });
  }

  async findAll(where: Prisma.MenuWhereInput = {}): Promise<Menu[]> {
    return prisma.menu.findMany({
      where: { ...where, isDeleted: false },
      orderBy: { sorting: 'asc' },
      include: {
        children: {
          where: { isDeleted: false },
          orderBy: { sorting: 'asc' },
          include: {
            children: {
              where: { isDeleted: false },
              orderBy: { sorting: 'asc' },
            },
          },
        },
      },
    });
  }

  async findById(id: number): Promise<Menu | null> {
    return prisma.menu.findUnique({
      where: { id },
      include: {
        children: {
          where: { isDeleted: false },
        },
      },
    });
  }

  async update(id: number, data: Prisma.MenuUpdateInput): Promise<Menu> {
    return prisma.menu.update({ where: { id }, data });
  }

  async delete(id: number, deletedBy: number): Promise<Menu> {
    // Soft delete
    return prisma.menu.update({
      where: { id },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy,
      },
    });
  }
}

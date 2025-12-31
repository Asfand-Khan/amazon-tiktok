import { SystemConfig, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class SystemConfigRepository {
  async create(data: Prisma.SystemConfigCreateInput): Promise<SystemConfig> {
    return prisma.systemConfig.create({ data });
  }

  async findAll(): Promise<SystemConfig[]> {
    return prisma.systemConfig.findMany();
  }

  async findByKey(key: string): Promise<SystemConfig | null> {
    return prisma.systemConfig.findUnique({ where: { key } });
  }

  async update(key: string, value: string): Promise<SystemConfig> {
    return prisma.systemConfig.update({
      where: { key },
      data: { value },
    });
  }
}

import { BrandingSettings, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class BrandingSettingsRepository {
  async getSettings(): Promise<BrandingSettings | null> {
    // Assuming single row logic, get the first one or specific logic
    return prisma.brandingSettings.findFirst();
  }

  async create(
    data: Prisma.BrandingSettingsCreateInput
  ): Promise<BrandingSettings> {
    return prisma.brandingSettings.create({ data });
  }

  async update(
    id: number,
    data: Prisma.BrandingSettingsUpdateInput
  ): Promise<BrandingSettings> {
    return prisma.brandingSettings.update({
      where: { id },
      data,
    });
  }
}

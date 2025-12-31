import { BrandingSettingsRepository } from '../repositories/branding.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const brandingRepository = new BrandingSettingsRepository();

export class BrandingSettingsService {
  async getSettings() {
    let settings = await brandingRepository.getSettings();
    /*
    if (!settings) {
      // Auto-create default settings if none exist?
      // Or return null/empty object. Let's auto-create for easier usage.
      settings = await brandingRepository.create({
          companyName: 'My Application'
      });
    }
    */
    if (!settings) throw new AppError('Branding settings not configured', 404);
    return settings;
  }

  async getSettingsPublic() {
    // Typically same as getSettings but maybe filtered if sensitive info existed
    // For now return all
    return brandingRepository.getSettings();
  }

  async updateSettings(data: Prisma.BrandingSettingsUpdateInput) {
    let settings = await brandingRepository.getSettings();
    if (!settings) {
      // Create if not exists
      return brandingRepository.create(
        data as Prisma.BrandingSettingsCreateInput
      );
    }
    return brandingRepository.update(settings.id, data);
  }
}

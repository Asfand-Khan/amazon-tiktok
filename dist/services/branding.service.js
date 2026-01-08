import { BrandingSettingsRepository } from '../repositories/branding.repository.js';
import { AppError } from '../utils/AppError.js';
const brandingRepository = new BrandingSettingsRepository();
export class BrandingSettingsService {
    async getSettings() {
        let settings = await brandingRepository.getSettings();
        if (!settings)
            throw new AppError('Branding settings not configured', 404);
        return settings;
    }
    async getSettingsPublic() {
        return brandingRepository.getSettings();
    }
    async updateSettings(data) {
        let settings = await brandingRepository.getSettings();
        if (!settings) {
            return brandingRepository.create(data);
        }
        return brandingRepository.update(settings.id, data);
    }
}
//# sourceMappingURL=branding.service.js.map
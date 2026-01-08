import { prisma } from '../lib/db.js';
export class BrandingSettingsRepository {
    async getSettings() {
        return prisma.brandingSettings.findFirst();
    }
    async create(data) {
        return prisma.brandingSettings.create({ data });
    }
    async update(id, data) {
        return prisma.brandingSettings.update({
            where: { id },
            data,
        });
    }
}
//# sourceMappingURL=branding.repository.js.map
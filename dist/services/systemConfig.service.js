import { SystemConfigRepository } from '../repositories/systemConfig.repository.js';
import { AppError } from '../utils/AppError.js';
const systemConfigRepository = new SystemConfigRepository();
export class SystemConfigService {
    async createConfig(data) {
        const existing = await systemConfigRepository.findByKey(data.key);
        if (existing) {
            throw new AppError('Config key already exists', 400);
        }
        return systemConfigRepository.create(data);
    }
    async getAllConfigs() {
        return systemConfigRepository.findAll();
    }
    async getConfigByKey(key) {
        const config = await systemConfigRepository.findByKey(key);
        if (!config) {
            throw new AppError('Config not found', 404);
        }
        return config;
    }
    async updateConfig(key, value) {
        const config = await systemConfigRepository.findByKey(key);
        if (!config) {
            throw new AppError('Config not found', 404);
        }
        if (!config.isEditable) {
            throw new AppError('This configuration is not editable', 403);
        }
        return systemConfigRepository.update(key, value);
    }
}
//# sourceMappingURL=systemConfig.service.js.map
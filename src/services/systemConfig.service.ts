import { SystemConfigRepository } from '../repositories/systemConfig.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const systemConfigRepository = new SystemConfigRepository();

export class SystemConfigService {
  async createConfig(data: Prisma.SystemConfigCreateInput) {
    const existing = await systemConfigRepository.findByKey(data.key);
    if (existing) {
      throw new AppError('Config key already exists', 400);
    }
    return systemConfigRepository.create(data);
  }

  async getAllConfigs() {
    return systemConfigRepository.findAll();
  }

  async getConfigByKey(key: string) {
    const config = await systemConfigRepository.findByKey(key);
    if (!config) {
      throw new AppError('Config not found', 404);
    }
    return config;
  }

  async updateConfig(key: string, value: string) {
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

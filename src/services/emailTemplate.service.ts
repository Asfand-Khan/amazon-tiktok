import { EmailTemplateRepository } from '../repositories/emailTemplate.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const emailTemplateRepository = new EmailTemplateRepository();

export class EmailTemplateService {
  async createTemplate(data: Prisma.EmailTemplateCreateInput) {
    // Unique type check logic should be handled by DB unique constraint, but good to check here or catch error
    return emailTemplateRepository.create(data);
  }

  async getAllTemplates() {
    return emailTemplateRepository.findAll();
  }

  async getTemplateById(id: number) {
    const template = await emailTemplateRepository.findById(id);
    if (!template) {
      throw new AppError('Template not found', 404);
    }
    return template;
  }

  async updateTemplate(id: number, data: Prisma.EmailTemplateUpdateInput) {
    const template = await emailTemplateRepository.findById(id);
    if (!template) {
      throw new AppError('Template not found', 404);
    }
    return emailTemplateRepository.update(id, data);
  }
}

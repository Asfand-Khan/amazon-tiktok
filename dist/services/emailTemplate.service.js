import { EmailTemplateRepository } from '../repositories/emailTemplate.repository.js';
import { AppError } from '../utils/AppError.js';
const emailTemplateRepository = new EmailTemplateRepository();
export class EmailTemplateService {
    async createTemplate(data) {
        return emailTemplateRepository.create(data);
    }
    async getAllTemplates() {
        return emailTemplateRepository.findAll();
    }
    async getTemplateById(id) {
        const template = await emailTemplateRepository.findById(id);
        if (!template) {
            throw new AppError('Template not found', 404);
        }
        return template;
    }
    async updateTemplate(id, data) {
        const template = await emailTemplateRepository.findById(id);
        if (!template) {
            throw new AppError('Template not found', 404);
        }
        return emailTemplateRepository.update(id, data);
    }
}
//# sourceMappingURL=emailTemplate.service.js.map
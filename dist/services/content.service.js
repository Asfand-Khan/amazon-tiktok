import { ContentRepository } from '../repositories/content.repository.js';
import { AppError } from '../utils/AppError.js';
const contentRepository = new ContentRepository();
export class ContentService {
    async createContent(data) {
        return contentRepository.create(data);
    }
    async getAllContent(publicOnly = false) {
        const filter = publicOnly
            ? { isActive: true }
            : {};
        return contentRepository.findAll(filter);
    }
    async getContentById(id) {
        const content = await contentRepository.findById(id);
        if (!content) {
            throw new AppError('Content not found', 404);
        }
        return content;
    }
    async updateContent(id, data) {
        const content = await contentRepository.findById(id);
        if (!content) {
            throw new AppError('Content not found', 404);
        }
        return contentRepository.update(id, data);
    }
    async deleteContent(id) {
        const content = await contentRepository.findById(id);
        if (!content) {
            throw new AppError('Content not found', 404);
        }
        return contentRepository.delete(id);
    }
}
//# sourceMappingURL=content.service.js.map
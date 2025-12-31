import { ContentRepository } from '../repositories/content.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const contentRepository = new ContentRepository();

export class ContentService {
  async createContent(data: Prisma.ContentCreateInput) {
    return contentRepository.create(data);
  }

  async getAllContent(publicOnly: boolean = false) {
    const filter: Prisma.ContentWhereInput = publicOnly
      ? { isActive: true }
      : {};
    return contentRepository.findAll(filter);
  }

  async getContentById(id: number) {
    const content = await contentRepository.findById(id);
    if (!content) {
      throw new AppError('Content not found', 404);
    }
    return content;
  }

  async updateContent(id: number, data: Prisma.ContentUpdateInput) {
    const content = await contentRepository.findById(id);
    if (!content) {
      throw new AppError('Content not found', 404);
    }
    return contentRepository.update(id, data);
  }

  async deleteContent(id: number) {
    const content = await contentRepository.findById(id);
    if (!content) {
      throw new AppError('Content not found', 404);
    }
    return contentRepository.delete(id);
  }
}

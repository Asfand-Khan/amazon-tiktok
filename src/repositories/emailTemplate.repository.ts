import { EmailTemplate, Prisma } from '@/generated/client.js';
import { prisma } from '../lib/db.js';

export class EmailTemplateRepository {
  async create(data: Prisma.EmailTemplateCreateInput): Promise<EmailTemplate> {
    return prisma.emailTemplate.create({ data });
  }

  async findAll(): Promise<EmailTemplate[]> {
    return prisma.emailTemplate.findMany();
  }

  async findById(id: number): Promise<EmailTemplate | null> {
    return prisma.emailTemplate.findUnique({ where: { id } });
  }

  // Assuming helper to find by type using exact enum
  async findByType(type: any): Promise<EmailTemplate | null> {
    return prisma.emailTemplate.findUnique({ where: { type } });
  }

  async update(
    id: number,
    data: Prisma.EmailTemplateUpdateInput
  ): Promise<EmailTemplate> {
    return prisma.emailTemplate.update({
      where: { id },
      data,
    });
  }
}

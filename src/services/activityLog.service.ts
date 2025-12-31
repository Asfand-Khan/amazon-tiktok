import { ActivityLogRepository } from '../repositories/activityLog.repository.js';
import { Prisma } from '@/generated/client.js';

const activityLogRepository = new ActivityLogRepository();

export class ActivityLogService {
  async logActivity(data: Prisma.ActivityLogCreateInput) {
    return activityLogRepository.create(data);
  }

  async getAllLogs(filter: any = {}) {
    // Build filter object here if needed, for now pass raw prisma filter
    return activityLogRepository.findAll(filter);
  }

  async getMyLogs(userId: number) {
    return activityLogRepository.findAll({ userId });
  }
}

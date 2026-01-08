import { ActivityLogRepository } from '../repositories/activityLog.repository.js';
const activityLogRepository = new ActivityLogRepository();
export class ActivityLogService {
    async logActivity(data) {
        return activityLogRepository.create(data);
    }
    async getAllLogs(filter = {}) {
        return activityLogRepository.findAll(filter);
    }
    async getMyLogs(userId) {
        return activityLogRepository.findAll({ userId });
    }
}
//# sourceMappingURL=activityLog.service.js.map
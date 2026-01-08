import { PlanRepository } from '../repositories/plan.repository.js';
import { AppError } from '../utils/AppError.js';
const planRepository = new PlanRepository();
export class PlanService {
    async createPlan(data) {
        return planRepository.create(data);
    }
    async getAllPlans(activeOnly = false) {
        const filter = activeOnly ? { isActive: true } : {};
        return planRepository.findAll(filter);
    }
    async getPlanById(id) {
        const plan = await planRepository.findById(id);
        if (!plan) {
            throw new AppError('Plan not found', 400);
        }
        return plan;
    }
    async updatePlan(id, data) {
        const plan = await planRepository.findById(id);
        if (!plan) {
            throw new AppError('Plan not found', 404);
        }
        return planRepository.update(id, data);
    }
    async deletePlan(id) {
        const plan = await planRepository.findById(id);
        if (!plan) {
            throw new AppError('Plan not found', 404);
        }
        return planRepository.delete(id);
    }
}
//# sourceMappingURL=plan.service.js.map
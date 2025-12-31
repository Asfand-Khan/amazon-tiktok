import { PlanRepository } from '../repositories/plan.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const planRepository = new PlanRepository();

export class PlanService {
  async createPlan(data: Prisma.PlanCreateInput) {
    // Check if a plan with the same name already exists? Not strictly unique in schema but good practice.
    // For now, let's just create it.
    return planRepository.create(data);
  }

  async getAllPlans(activeOnly: boolean = false) {
    const filter: Prisma.PlanWhereInput = activeOnly ? { isActive: true } : {};
    return planRepository.findAll(filter);
  }

  async getPlanById(id: number) {
    const plan = await planRepository.findById(id);
    if (!plan) {
      throw new AppError('Plan not found', 400);
    }
    return plan;
  }

  async updatePlan(id: number, data: Prisma.PlanUpdateInput) {
    const plan = await planRepository.findById(id);
    if (!plan) {
      throw new AppError('Plan not found', 404);
    }
    return planRepository.update(id, data);
  }

  async deletePlan(id: number) {
    const plan = await planRepository.findById(id);
    if (!plan) {
      throw new AppError('Plan not found', 404);
    }
    return planRepository.delete(id);
  }
}

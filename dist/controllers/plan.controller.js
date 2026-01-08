import { PlanService } from '../services/plan.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const planService = new PlanService();
export const createPlan = catchAsync(async (req, res) => {
    const plan = await planService.createPlan(req.body);
    res.status(201).json({
        success: true,
        message: 'Plan created successfully',
        payload: plan,
    });
});
export const getAllPlans = catchAsync(async (req, res) => {
    const activeOnly = req.query.activeOnly === 'true';
    const plans = await planService.getAllPlans(activeOnly);
    res.status(200).json({
        success: true,
        message: 'Plans fetched successfully',
        payload: plans,
    });
});
export const getPlanById = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const plan = await planService.getPlanById(id);
    res.status(200).json({
        success: true,
        message: 'Plan fetched successfully',
        payload: plan,
    });
});
export const updatePlan = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const plan = await planService.updatePlan(id, req.body);
    res.status(200).json({
        success: true,
        message: 'Plan updated successfully',
        payload: plan,
    });
});
export const deletePlan = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await planService.deletePlan(id);
    res.status(204).json({
        success: true,
        message: 'Plan deleted successfully',
        payload: null,
    });
});
//# sourceMappingURL=plan.controller.js.map
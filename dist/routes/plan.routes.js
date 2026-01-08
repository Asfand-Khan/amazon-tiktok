import express from 'express';
import * as planController from '../controllers/plan.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { allPlansSchema, createPlanSchema, planIdSchema, updatePlanSchema, } from '../validations/plan.validation.js';
const router = express.Router();
router.get('/', validate(allPlansSchema), planController.getAllPlans);
router.get('/:id', validate(planIdSchema), planController.getPlanById);
router.use(protect, restrictTo('SUPER_ADMIN', 'ADMIN'));
router.post('/', validate(createPlanSchema), planController.createPlan);
router.patch('/:id', validate(updatePlanSchema), planController.updatePlan);
router.delete('/:id', validate(planIdSchema), planController.deletePlan);
export default router;
//# sourceMappingURL=plan.routes.js.map
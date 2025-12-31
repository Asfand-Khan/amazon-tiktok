import express from 'express';
import * as subscriptionController from '../controllers/subscription.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createSubscriptionSchema,
  updateSubscriptionSchema,
} from '../validations/subscription.validation.js';

const router = express.Router();

router.use(protect);

// Client routes
router.post(
  '/',
  validate(createSubscriptionSchema),
  subscriptionController.createSubscription
);
router.get('/me', subscriptionController.getMySubscription);
router.post('/:id/cancel', subscriptionController.cancelSubscription); // User can cancel own

// Admin routes
router.use(restrictTo('SUPER_ADMIN', 'ADMIN'));
router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.patch(
  '/:id',
  validate(updateSubscriptionSchema),
  subscriptionController.updateSubscription
);

export default router;

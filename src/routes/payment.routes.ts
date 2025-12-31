import express from 'express';
import * as paymentController from '../controllers/payment.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createPaymentSchema,
  updatePaymentSchema,
} from '../validations/payment.validation.js';

const router = express.Router();

router.use(protect);

// Client routes
router.post(
  '/',
  validate(createPaymentSchema),
  paymentController.createPayment
);
router.get('/me', paymentController.getMyPayments);

// Admin routes
router.use(restrictTo('SUPER_ADMIN', 'ADMIN'));
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.patch(
  '/:id',
  validate(updatePaymentSchema),
  paymentController.updatePayment
);

export default router;

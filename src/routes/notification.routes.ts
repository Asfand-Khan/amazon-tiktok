import express from 'express';
import * as notificationController from '../controllers/notification.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createNotificationSchema } from '../validations/notification.validation.js';

const router = express.Router();

router.use(protect);

router.get('/', notificationController.getMyNotifications);
router.patch('/mark-all-read', notificationController.markAllAsRead);
router.patch('/:id/read', notificationController.markAsRead);

// Admin route to create notification manually
router.post(
  '/',
  restrictTo('SUPER_ADMIN'),
  validate(createNotificationSchema),
  notificationController.createNotification
);

export default router;

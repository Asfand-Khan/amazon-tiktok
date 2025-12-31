import express from 'express';
import * as activityLogController from '../controllers/activityLog.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/me', activityLogController.getMyLogs);

// Admin routes
router.use(restrictTo('SUPER_ADMIN', 'ADMIN'));
router.get('/', activityLogController.getAllLogs);

export default router;

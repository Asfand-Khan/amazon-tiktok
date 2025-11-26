import { Router } from 'express';
import {
  getDashboard,
  regenerateApiKey,
} from '../controllers/client.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';

const router = Router();

// Protect all routes after this middleware
router.use(protect);
router.use(restrictTo('CLIENT', 'SUPER_ADMIN', 'ADMIN'));

router.get('/dashboard', getDashboard);
router.post('/api-key/regenerate', regenerateApiKey);

export default router;

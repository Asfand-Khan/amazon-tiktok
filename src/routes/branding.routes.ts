import express from 'express';
import * as brandingController from '../controllers/branding.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import { updateBrandingSchema } from '../validations/branding.validation.js';

const router = express.Router();

// Public read access
router.get('/', brandingController.getBrandingSettings);

// Admin only write access
router.use(protect, restrictTo('SUPER_ADMIN', 'ADMIN'));

router.put(
  '/',
  validate(updateBrandingSchema),
  brandingController.updateBrandingSettings
);
router.patch(
  '/',
  validate(updateBrandingSchema),
  brandingController.updateBrandingSettings
);

export default router;

import { Router } from 'express';
import {
  createMenu,
  getAllMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
} from '../controllers/menu.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createMenuSchema,
  updateMenuSchema,
  getMenuSchema,
} from '../validations/menu.validation.js';

const router = Router();

router.use(protect); // Protect all routes
router.use(restrictTo('SUPER_ADMIN', 'ADMIN')); // Restrict to Admin

router.get('/', getAllMenus);
router.post('/', validate(createMenuSchema), createMenu);
router.get('/:id', validate(getMenuSchema), getMenuById);
router.put('/:id', validate(updateMenuSchema), updateMenu);
router.delete('/:id', validate(getMenuSchema), deleteMenu);

export default router;

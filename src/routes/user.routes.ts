import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/user.controller.js';
import { protect, restrictTo } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  updateUserSchema,
  userIdSchema,
} from '../validations/user.validation.js';

const router = Router();

// Protect and Restrict to Admin
router.use(protect);
router.use(restrictTo('SUPER_ADMIN', 'ADMIN'));

router.get('/', getAllUsers);
router.get('/:id', validate(userIdSchema), getUserById);
router.patch('/:id', validate(updateUserSchema), updateUser);
router.delete('/:id', validate(userIdSchema), deleteUser);

export default router;

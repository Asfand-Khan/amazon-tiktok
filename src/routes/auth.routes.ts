import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from '../validations/auth.validation.js';
import { protect } from '@/middlewares/auth.middleware.js';

const router = Router();

router.post('/login', validate(loginSchema), login);

router.use(protect);
router.post('/register', validate(registerSchema), register);
router.get('/logout', logout);

export default router;

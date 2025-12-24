import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { LoginInput, RegisterInput } from '@/validations/auth.validation.js';

const authService = new AuthService();

export const register = catchAsync(async (req: Request, res: Response) => {
  const body: RegisterInput['body'] = req.body;
  const user = await authService.register(body);

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    payload: {
      user,
    },
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const body: LoginInput['body'] = req.body;
  const { user, token, menus } = await authService.login(body, {
    ipAddress: req.ip,
    userAgent: req.get('user-agent'),
  });

  res.status(200).json({
    success: true,
    message: 'Login successfully',
    payload: {
      token,
      user,
      menus,
    },
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (token) {
    await authService.logout(token);
  }

  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
    payload: {},
  });
});

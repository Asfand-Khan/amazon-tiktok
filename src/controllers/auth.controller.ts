import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service.js';
import { catchAsync } from '../utils/catchAsync.js';

const authService = new AuthService();

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await authService.register(req.body);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user, token } = await authService.login(req.body);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user,
      },
    });
  }
);

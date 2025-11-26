import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync.js';

export const checkHealth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: 'success',
      message: 'Server is healthy and running!',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  }
);

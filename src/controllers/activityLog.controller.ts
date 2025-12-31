import { Request, Response } from 'express';
import { ActivityLogService } from '../services/activityLog.service.js';
import { catchAsync } from '../utils/catchAsync.js';

const activityLogService = new ActivityLogService();

export const getAllLogs = catchAsync(async (req: Request, res: Response) => {
  const logs = await activityLogService.getAllLogs();

  res.status(200).json({
    success: true,
    message: 'Activity logs fetched successfully',
    payload: logs,
  });
});

export const getMyLogs = catchAsync(async (req: Request, res: Response) => {
  const logs = await activityLogService.getMyLogs(req.user.id);

  res.status(200).json({
    success: true,
    message: 'Your activity logs fetched successfully',
    payload: logs,
  });
});

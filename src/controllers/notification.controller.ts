import { Request, Response } from 'express';
import { NotificationService } from '../services/notification.service.js';
import { catchAsync } from '../utils/catchAsync.js';

const notificationService = new NotificationService();

// Usually system creates notifications, but admin might "send" one (manually creating it via API)
export const createNotification = catchAsync(
  async (req: Request, res: Response) => {
    const notification = await notificationService.createNotification({
      user: { connect: { id: req.body.userId } },
      type: req.body.type,
      title: req.body.title,
      message: req.body.message,
      metadata: req.body.metadata,
    } as any); // Adjust type casting as needed for Prisma input

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      payload: notification,
    });
  }
);

export const getMyNotifications = catchAsync(
  async (req: Request, res: Response) => {
    const unreadOnly = req.query.unreadOnly === 'true';
    const notifications = await notificationService.getMyNotifications(
      req.user.id,
      unreadOnly
    );

    res.status(200).json({
      success: true,
      message: 'Notifications fetched successfully',
      payload: notifications,
    });
  }
);

export const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const notification = await notificationService.markAsRead(id, req.user.id);

  res.status(200).json({
    success: true,
    message: 'Notification marked as read',
    payload: notification,
  });
});

export const markAllAsRead = catchAsync(async (req: Request, res: Response) => {
  await notificationService.markAllAsRead(req.user.id);

  res.status(200).json({
    success: true,
    message: 'All notifications marked as read',
    payload: null,
  });
});

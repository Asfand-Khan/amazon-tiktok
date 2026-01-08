import { NotificationService } from '../services/notification.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const notificationService = new NotificationService();
export const createNotification = catchAsync(async (req, res) => {
    const notification = await notificationService.createNotification({
        user: { connect: { id: req.body.userId } },
        type: req.body.type,
        title: req.body.title,
        message: req.body.message,
        metadata: req.body.metadata,
    });
    res.status(201).json({
        success: true,
        message: 'Notification created successfully',
        payload: notification,
    });
});
export const getMyNotifications = catchAsync(async (req, res) => {
    const unreadOnly = req.query.unreadOnly === 'true';
    const notifications = await notificationService.getMyNotifications(req.user.id, unreadOnly);
    res.status(200).json({
        success: true,
        message: 'Notifications fetched successfully',
        payload: notifications,
    });
});
export const markAsRead = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const notification = await notificationService.markAsRead(id, req.user.id);
    res.status(200).json({
        success: true,
        message: 'Notification marked as read',
        payload: notification,
    });
});
export const markAllAsRead = catchAsync(async (req, res) => {
    await notificationService.markAllAsRead(req.user.id);
    res.status(200).json({
        success: true,
        message: 'All notifications marked as read',
        payload: null,
    });
});
//# sourceMappingURL=notification.controller.js.map
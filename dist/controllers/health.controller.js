import { catchAsync } from '../utils/catchAsync.js';
export const checkHealth = catchAsync(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is healthy and running!',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});
//# sourceMappingURL=health.controller.js.map
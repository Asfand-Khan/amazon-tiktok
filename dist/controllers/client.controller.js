import { ClientService } from '../services/client.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const clientService = new ClientService();
export const getDashboard = catchAsync(async (req, res, next) => {
    const data = await clientService.getDashboardData(req.user.id);
    res.status(200).json({
        status: 'success',
        data,
    });
});
export const regenerateApiKey = catchAsync(async (req, res, next) => {
    const data = await clientService.regenerateApiKey(req.user.id);
    res.status(200).json({
        status: 'success',
        data,
    });
});
//# sourceMappingURL=client.controller.js.map
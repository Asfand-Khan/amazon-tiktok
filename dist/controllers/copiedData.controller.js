import { CopiedDataService } from '../services/copiedData.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const copiedDataService = new CopiedDataService();
export const createCopiedData = catchAsync(async (req, res) => {
    const data = await copiedDataService.saveCopiedData(req.user.id, {
        ...req.body,
        userAgent: req.get('user-agent'),
    });
    res.status(201).json({
        success: true,
        message: 'Data saved successfully',
        payload: data,
    });
});
export const getMyCopiedData = catchAsync(async (req, res) => {
    const data = await copiedDataService.getMyCopiedData(req.user.id);
    res.status(200).json({
        success: true,
        message: 'Data fetched successfully',
        payload: data,
    });
});
export const getCopiedDataById = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    let data;
    if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'ADMIN') {
        data = await copiedDataService.getAnyCopiedDataById(id);
    }
    else {
        data = await copiedDataService.getCopiedDataById(id, req.user.id);
    }
    res.status(200).json({
        success: true,
        message: 'Data fetched successfully',
        payload: data,
    });
});
export const updateCopiedData = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = await copiedDataService.updateCopiedData(id, req.user.id, req.body);
    res.status(200).json({
        success: true,
        message: 'Data updated successfully',
        payload: data,
    });
});
export const deleteCopiedData = catchAsync(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    await copiedDataService.deleteCopiedData(id, req.user.id);
    res.status(204).json({
        success: true,
        message: 'Data deleted successfully',
        payload: null,
    });
});
//# sourceMappingURL=copiedData.controller.js.map
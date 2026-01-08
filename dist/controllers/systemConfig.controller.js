import { SystemConfigService } from '../services/systemConfig.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const systemConfigService = new SystemConfigService();
export const createConfig = catchAsync(async (req, res) => {
    const config = await systemConfigService.createConfig(req.body);
    res.status(201).json({
        success: true,
        message: 'Config created successfully',
        payload: config,
    });
});
export const getAllConfigs = catchAsync(async (req, res) => {
    const configs = await systemConfigService.getAllConfigs();
    res.status(200).json({
        success: true,
        message: 'Configs fetched successfully',
        payload: configs,
    });
});
export const getConfigByKey = catchAsync(async (req, res) => {
    const config = await systemConfigService.getConfigByKey(req.params.key);
    res.status(200).json({
        success: true,
        message: 'Config fetched successfully',
        payload: config,
    });
});
export const updateConfig = catchAsync(async (req, res) => {
    const config = await systemConfigService.updateConfig(req.params.key, req.body.value);
    res.status(200).json({
        success: true,
        message: 'Config updated successfully',
        payload: config,
    });
});
//# sourceMappingURL=systemConfig.controller.js.map
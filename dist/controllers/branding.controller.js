import { BrandingSettingsService } from '../services/branding.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const brandingService = new BrandingSettingsService();
export const getBrandingSettings = catchAsync(async (req, res) => {
    const settings = await brandingService.getSettingsPublic();
    res.status(200).json({
        success: true,
        message: 'Branding settings fetched successfully',
        payload: settings || {},
    });
});
export const updateBrandingSettings = catchAsync(async (req, res) => {
    const settings = await brandingService.updateSettings(req.body);
    res.status(200).json({
        success: true,
        message: 'Branding settings updated successfully',
        payload: settings,
    });
});
//# sourceMappingURL=branding.controller.js.map
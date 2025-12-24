import { MenuService } from '../services/menu.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const menuService = new MenuService();
export const createMenu = catchAsync(async (req, res, next) => {
    const menu = await menuService.createMenu(req.body, req.user.id);
    return res.status(201).json({
        success: true,
        message: 'Menu created successfully',
        data: menu,
    });
});
export const getAllMenus = catchAsync(async (req, res, next) => {
    const menus = await menuService.getAllMenus();
    return res.status(200).json({
        success: true,
        message: 'Menus fetched successfully',
        data: menus,
    });
});
export const getMenuById = catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const menu = await menuService.getMenuById(id);
    return res.status(200).json({
        success: true,
        message: 'Menu fetched successfully',
        data: menu,
    });
});
export const updateMenu = catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const menu = await menuService.updateMenu(id, req.body);
    return res.status(200).json({
        success: true,
        message: 'Menu updated successfully',
        data: menu,
    });
});
export const deleteMenu = catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    await menuService.deleteMenu(id, req.user.id);
    return res.status(204).json({
        success: true,
        message: 'Menu deleted successfully',
        data: null,
    });
});
//# sourceMappingURL=menu.controller.js.map
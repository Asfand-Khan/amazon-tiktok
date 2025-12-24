import { Request, Response, NextFunction } from 'express';
import { MenuService } from '../services/menu.service.js';
import { catchAsync } from '../utils/catchAsync.js';

const menuService = new MenuService();

export const createMenu = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const menu = await menuService.createMenu(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: 'Menu created successfully',
      payload: menu,
    });
  }
);

export const getAllMenus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const menus = await menuService.getAllMenusFlat();

    return res.status(200).json({
      success: true,
      message: 'Menus fetched successfully',
      payload: menus,
    });
  }
);

export const getMenuById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validated params.id is already transformed to number by Zod?
    // Wait, Generic validate middleware just validates but request params remain string unless we manually cast or use validated data.
    // However, validation schema transform(Number) updates the value BUT validate middleware validates req.params/body/query
    // The validate middleware uses schema.parseAsync().
    // schema.parse returns the transformed data, but our middleware didn't assign it back to req.
    // Let's rely on req.params.id being a string that looks like a number, and cast it in controller or let service handle conversion if passed as string.
    // But implementation plan says "Use Int". Let's cast it here since Zod ensures it's a valid number format.
    const id = parseInt(req.params.id, 10);
    const menu = await menuService.getMenuById(id);

    return res.status(200).json({
      success: true,
      message: 'Menu fetched successfully',
      payload: menu,
    });
  }
);

export const updateMenu = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const menu = await menuService.updateMenu(id, req.body);

    return res.status(200).json({
      success: true,
      message: 'Menu updated successfully',
      payload: menu,
    });
  }
);

export const deleteMenu = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    await menuService.deleteMenu(id, req.user.id);

    return res.status(204).json({
      success: true,
      message: 'Menu deleted successfully',
      payload: null,
    });
  }
);

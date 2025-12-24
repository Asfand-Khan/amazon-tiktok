import { MenuRepository } from '../repositories/menu.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';

const menuRepository = new MenuRepository();

export class MenuService {
  async createMenu(data: any, userId: number) {
    const menuData: Prisma.MenuCreateInput = {
      ...data,
      createdBy: userId,
    };
    return menuRepository.create(menuData);
  }

  async getAllMenus() {
    // Return only root menus (parentId is null)
    return menuRepository.findAll({ parentId: null });
  }

  async getAllMenusFlat() {
    return menuRepository.findAll({});
  }

  async getMenuById(id: number) {
    const menu = await menuRepository.findById(id);
    if (!menu || menu.isDeleted) {
      throw new AppError('Menu not found', 404);
    }
    return menu;
  }

  async updateMenu(id: number, data: Prisma.MenuUpdateInput) {
    const menu = await menuRepository.findById(id);
    if (!menu || menu.isDeleted) {
      throw new AppError('Menu not found', 404);
    }
    return menuRepository.update(id, data);
  }

  async deleteMenu(id: number, userId: number) {
    const menu = await menuRepository.findById(id);
    if (!menu || menu.isDeleted) {
      throw new AppError('Menu not found', 404);
    }
    return menuRepository.delete(id, userId);
  }
}

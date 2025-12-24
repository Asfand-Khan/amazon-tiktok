import { MenuRepository } from '../repositories/menu.repository.js';
import { AppError } from '../utils/AppError.js';
const menuRepository = new MenuRepository();
export class MenuService {
    async createMenu(data, userId) {
        const menuData = {
            ...data,
            createdBy: userId,
        };
        return menuRepository.create(menuData);
    }
    async getAllMenus() {
        return menuRepository.findAll({ parentId: null });
    }
    async getAllMenusFlat() {
        return menuRepository.findAll({});
    }
    async getMenuById(id) {
        const menu = await menuRepository.findById(id);
        if (!menu || menu.isDeleted) {
            throw new AppError('Menu not found', 404);
        }
        return menu;
    }
    async updateMenu(id, data) {
        const menu = await menuRepository.findById(id);
        if (!menu || menu.isDeleted) {
            throw new AppError('Menu not found', 404);
        }
        return menuRepository.update(id, data);
    }
    async deleteMenu(id, userId) {
        const menu = await menuRepository.findById(id);
        if (!menu || menu.isDeleted) {
            throw new AppError('Menu not found', 404);
        }
        return menuRepository.delete(id, userId);
    }
}
//# sourceMappingURL=menu.service.js.map
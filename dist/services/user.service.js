import { UserRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
const userRepository = new UserRepository();
export class UserService {
    async getAllUsers() {
        return userRepository.findAll();
    }
    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async updateUser(id, data) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        const { rights, ...userData } = data;
        const updateData = {
            ...userData,
        };
        if (rights) {
            updateData.userMenuRights = {
                deleteMany: {},
                create: rights.map((right) => ({
                    menu: { connect: { id: right.menuId } },
                    canView: right.canView,
                    canCreate: right.canCreate,
                    canEdit: right.canEdit,
                    canDelete: right.canDelete,
                })),
            };
        }
        const updatedUser = await userRepository.update(id, updateData);
        const { password, ...userWithoutPassword } = updatedUser;
        return userWithoutPassword;
    }
    async deleteUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError('User not found', 404);
        }
        return userRepository.delete(id);
    }
}
//# sourceMappingURL=user.service.js.map
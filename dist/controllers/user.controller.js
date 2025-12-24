import { UserService } from '../services/user.service.js';
import { catchAsync } from '../utils/catchAsync.js';
const userService = new UserService();
export const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await userService.getAllUsers();
    res.status(200).json({
        success: true,
        data: users,
    });
});
export const getUserById = catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);
    res.status(200).json({
        success: true,
        data: user,
    });
});
export const updateUser = catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    const user = await userService.updateUser(id, req.body);
    res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: user,
    });
});
export const deleteUser = catchAsync(async (req, res, next) => {
    const id = parseInt(req.params.id, 10);
    await userService.deleteUser(id);
    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: null,
    });
});
//# sourceMappingURL=user.controller.js.map
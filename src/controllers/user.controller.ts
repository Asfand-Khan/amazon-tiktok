import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service.js';
import { catchAsync } from '../utils/catchAsync.js';
import { UpdateUser } from '@/validations/user.validation.js';

const userService = new UserService();

export const getAllUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      payload: {
        users,
      },
    });
  }
);

export const getUserById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const user = await userService.getUserById(id);

    res.status(200).json({
      success: true,
      message: 'Single user fetched successfully',
      payload: {
        user,
      },
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    const body: UpdateUser['body'] = req.body;
    const user = await userService.updateUser(id, body);

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      payload: {
        user,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    await userService.deleteUser(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      payload: {},
    });
  }
);

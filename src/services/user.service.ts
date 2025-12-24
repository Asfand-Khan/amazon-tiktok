import { UpdateUser } from '@/validations/user.validation.js';
import { UserRepository } from '../repositories/user.repository.js';
import { AppError } from '../utils/AppError.js';
import { Prisma } from '@/generated/client.js';
import bcrypt from 'bcryptjs';

const userRepository = new UserRepository();

export class UserService {
  async getAllUsers() {
    return userRepository.findAll();
  }

  async getUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    // Remove password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateUser(id: number, data: UpdateUser['body']) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (data.email) {
      const userExists = await userRepository.findByEmail(data.email);
      if (userExists && userExists.id !== id) {
        throw new AppError('Email already exists', 400);
      }
    }

    const { rights, ...userData } = data;

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }

    const updateData: Prisma.UserUpdateInput = {
      ...userData,
    };

    if (rights) {
      // If rights provided, replace existing rights
      updateData.userMenuRights = {
        deleteMany: {}, // Delete all existing rights for this user
        create: rights.map((right: any) => ({
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

  async deleteUser(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return userRepository.delete(id);
  }
}

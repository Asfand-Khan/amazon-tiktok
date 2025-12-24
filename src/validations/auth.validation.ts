import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
    firstName: z
      .string({
        required_error: 'First name is required',
      })
      .min(3, 'First name must be at least 3 characters long')
      .max(30, 'First name must be at most 30 characters long'),
    lastName: z
      .string({
        required_error: 'Last name is required',
      })
      .min(3, 'Last name must be at least 3 characters long')
      .max(30, 'Last name must be at most 30 characters long'),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'STAFF', 'CLIENT']),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']),
    emailVerified: z.boolean().default(true),
    rights: z.array(
      z.object({
        menuId: z
          .number({
            required_error: 'Rights - Menu ID is required',
          })
          .int()
          .positive(),
        canView: z
          .boolean({
            required_error: 'Rights - Can view is required',
          })
          .default(true),
        canCreate: z
          .boolean({
            required_error: 'Rights - Can create is required',
          })
          .default(false),
        canEdit: z
          .boolean({
            required_error: 'Rights - Can edit is required',
          })
          .default(false),
        canDelete: z
          .boolean({
            required_error: 'Rights - Can delete is required',
          })
          .default(false),
      })
    ),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password must be at least 8 characters long'),
  }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

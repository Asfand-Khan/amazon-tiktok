import { z } from 'zod';

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  }),
  body: z.object({
    email: z.string().email('Invalid email address').optional(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .optional(),
    firstName: z
      .string()
      .min(3, 'First name must be at least 3 characters long')
      .max(30, 'First name must be at most 30 characters long')
      .optional(),
    lastName: z
      .string()
      .min(3, 'Last name must be at least 3 characters long')
      .max(30, 'Last name must be at most 30 characters long')
      .optional(),
    role: z.enum(['SUPER_ADMIN', 'ADMIN', 'STAFF', 'CLIENT']).optional(),
    status: z.enum(['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING']).optional(),
    rights: z
      .array(
        z.object({
          menuId: z.number().int().positive(),
          canView: z.boolean().default(true),
          canCreate: z.boolean().default(false),
          canEdit: z.boolean().default(false),
          canDelete: z.boolean().default(false),
        })
      )
      .optional(),
  }),
});

export const userIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  }),
});

export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserId = z.infer<typeof userIdSchema>;

import { z } from 'zod';

export const createPlanSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    displayName: z.string().min(1, 'Display name is required'),
    description: z.string().optional(),
    type: z.enum(['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM']),
    interval: z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY', 'LIFETIME']),
    price: z.number().nonnegative('Price must be non-negative'),
    currency: z.string().default('USD'),
    usageLimit: z
      .number()
      .int()
      .nonnegative('Usage limit must be non-negative'),
    features: z.array(z.string()).min(1, 'At least one feature is required'),
    isActive: z.boolean().default(true),
    isPopular: z.boolean().default(false),
    sortOrder: z.number().int().default(0),
  }),
});

export const updatePlanSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  }),
  body: z.object({
    name: z.string().optional(),
    displayName: z.string().optional(),
    description: z.string().optional(),
    type: z
      .enum(['FREE', 'STARTER', 'PROFESSIONAL', 'ENTERPRISE', 'CUSTOM'])
      .optional(),
    interval: z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY', 'LIFETIME']).optional(),
    price: z.number().nonnegative().optional(),
    currency: z.string().optional(),
    usageLimit: z.number().int().nonnegative().optional(),
    features: z.array(z.string()).optional(),
    isActive: z.boolean().optional(),
    isPopular: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
  }),
});

export const planIdSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  }),
});

export const allPlansSchema = z.object({
  query: z.object({
    activeOnly: z
      .enum(['true', 'false'])
      .default('false')
      .transform((val) => (val === 'true' ? true : false)),
  }),
});

export type CreatePlanInput = z.infer<typeof createPlanSchema>;
export type UpdatePlanInput = z.infer<typeof updatePlanSchema>;
export type PlanIdInput = z.infer<typeof planIdSchema>;
export type AllPlansInput = z.infer<typeof allPlansSchema>;

import { z } from 'zod';

export const createMenuSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Menu name is required' }).min(2).max(100),
    description: z.string().max(100).optional(),
    parentId: z.number().optional().nullable(),
    url: z.string().max(255).optional().nullable(),
    icon: z.string().max(100).optional().nullable(),
    sorting: z.number().int().default(0),
    isActive: z.boolean().default(true),
  }),
});

export const updateMenuSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    description: z.string().max(100).optional(),
    parentId: z.number().optional().nullable(),
    url: z.string().max(255).optional().nullable(),
    icon: z.string().max(100).optional().nullable(),
    sorting: z.number().int().optional(),
    isActive: z.boolean().optional(),
  }),
});

export const getMenuSchema = z.object({
  params: z.object({
    id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number),
  }),
});

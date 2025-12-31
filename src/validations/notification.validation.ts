import { z } from 'zod';

export const createNotificationSchema = z.object({
  body: z.object({
    userId: z.number().int().positive(),
    type: z.enum([
      'NEW_SIGNUP',
      'PAYMENT_SUCCESS',
      'PAYMENT_FAILED',
      'SUBSCRIPTION_EXPIRED',
      'API_KEY_GENERATED',
      'USAGE_LIMIT_REACHED',
      'SYSTEM_ALERT',
    ]),
    title: z.string().min(1, 'Title is required'),
    message: z.string().min(1, 'Message is required'),
    metadata: z.record(z.any()).optional(),
  }),
});

export const updateNotificationSchema = z.object({
  body: z.object({
    isRead: z.boolean().optional(),
  }),
});

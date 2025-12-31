import { z } from 'zod';

export const createEmailTemplateSchema = z.object({
  body: z.object({
    type: z.enum([
      'WELCOME_EMAIL',
      'PAYMENT_SUCCESS',
      'PAYMENT_FAILED',
      'SUBSCRIPTION_EXPIRING',
      'SUBSCRIPTION_EXPIRED',
      'API_KEY_ISSUED',
      'PASSWORD_RESET',
      'EMAIL_VERIFICATION',
    ]),
    subject: z.string().min(1, 'Subject is required'),
    body: z.string().min(1, 'Body is required'),
    variables: z.record(z.any()).optional(),
    isActive: z.boolean().default(true),
  }),
});

export const updateEmailTemplateSchema = z.object({
  body: z.object({
    subject: z.string().optional(),
    body: z.string().optional(),
    variables: z.record(z.any()).optional(),
    isActive: z.boolean().optional(),
  }),
});

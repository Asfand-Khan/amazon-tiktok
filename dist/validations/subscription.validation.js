import { z } from 'zod';
export const createSubscriptionSchema = z.object({
    body: z.object({
        planId: z.number().int().positive('Plan ID must be valid'),
        clientId: z.number().int().positive('Client ID must be valid').optional(),
    }),
});
export const updateSubscriptionSchema = z.object({
    body: z.object({
        status: z
            .enum(['ACTIVE', 'EXPIRED', 'CANCELLED', 'PAUSED', 'PENDING_PAYMENT'])
            .optional(),
        autoRenew: z.boolean().optional(),
        customUsageLimit: z.number().int().nonnegative().optional(),
        endDate: z.string().datetime().optional(),
    }),
});
//# sourceMappingURL=subscription.validation.js.map
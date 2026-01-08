import { z } from 'zod';
export const createPaymentSchema = z.object({
    body: z.object({
        amount: z.number().positive(),
        currency: z.string().default('USD'),
        description: z.string().optional(),
        clientId: z.number().int().positive().optional(),
    }),
});
export const updatePaymentSchema = z.object({
    body: z.object({
        status: z
            .enum([
            'PENDING',
            'PROCESSING',
            'SUCCEEDED',
            'FAILED',
            'REFUNDED',
            'CANCELLED',
        ])
            .optional(),
        metadata: z.record(z.any()).optional(),
        failureReason: z.string().optional(),
    }),
});
//# sourceMappingURL=payment.validation.js.map
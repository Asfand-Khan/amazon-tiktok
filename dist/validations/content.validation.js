import { z } from 'zod';
export const createContentSchema = z.object({
    body: z.object({
        type: z.enum([
            'PRICING_SECTION',
            'PROMOTION_SECTION',
            'ALERT_BANNER',
            'FAQ_SECTION',
            'TESTIMONIAL',
        ]),
        title: z.string().min(1, 'Title is required'),
        content: z.record(z.any()),
        isActive: z.boolean().default(true),
        sortOrder: z.number().int().default(0),
        publishedAt: z.string().datetime().optional(),
    }),
});
export const updateContentSchema = z.object({
    body: z.object({
        type: z
            .enum([
            'PRICING_SECTION',
            'PROMOTION_SECTION',
            'ALERT_BANNER',
            'FAQ_SECTION',
            'TESTIMONIAL',
        ])
            .optional(),
        title: z.string().optional(),
        content: z.record(z.any()).optional(),
        isActive: z.boolean().optional(),
        sortOrder: z.number().int().optional(),
        publishedAt: z.string().datetime().nullable().optional(),
    }),
});
//# sourceMappingURL=content.validation.js.map
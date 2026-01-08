import { z } from 'zod';
export const createCopiedDataSchema = z.object({
    body: z.object({
        productTitle: z.string().min(1, 'Product title is required'),
        productAsin: z.string().optional(),
        productPrice: z.number().nonnegative().optional(),
        productImage: z.string().url().optional(),
        productUrl: z.string().url().optional(),
        productData: z.record(z.any()),
        tiktokShopUrl: z.string().url().optional(),
        tiktokStatus: z.string().optional(),
        copiedFrom: z.string().optional(),
    }),
});
export const updateCopiedDataSchema = z.object({
    body: z.object({
        productTitle: z.string().optional(),
        productAsin: z.string().optional(),
        productPrice: z.number().optional(),
        productImage: z.string().url().optional(),
        productUrl: z.string().url().optional(),
        productData: z.record(z.any()).optional(),
        tiktokShopUrl: z.string().url().optional(),
        tiktokStatus: z.string().optional(),
    }),
});
//# sourceMappingURL=copiedData.validation.js.map
import { z } from 'zod';
export const updateBrandingSchema = z.object({
    body: z.object({
        logoUrl: z.string().url().optional().nullable(),
        faviconUrl: z.string().url().optional().nullable(),
        primaryColor: z.string().optional().nullable(),
        secondaryColor: z.string().optional().nullable(),
        fontFamily: z.string().optional().nullable(),
        companyName: z.string().optional().nullable(),
        tagline: z.string().optional().nullable(),
        email: z.string().email().optional().nullable(),
        phone: z.string().optional().nullable(),
        address: z.string().optional().nullable(),
        socialLinks: z.record(z.any()).optional().nullable(),
        metaTitle: z.string().optional().nullable(),
        metaDescription: z.string().optional().nullable(),
        metaKeywords: z.string().optional().nullable(),
    }),
});
//# sourceMappingURL=branding.validation.js.map
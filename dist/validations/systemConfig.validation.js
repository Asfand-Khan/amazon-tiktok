import { z } from 'zod';
export const createSystemConfigSchema = z.object({
    body: z.object({
        key: z.string().min(1, 'Key is required'),
        value: z.string().min(1, 'Value is required'),
        description: z.string().optional(),
        isEditable: z.boolean().default(true),
    }),
});
export const updateSystemConfigSchema = z.object({
    body: z.object({
        value: z.string().min(1, 'Value is required'),
    }),
});
//# sourceMappingURL=systemConfig.validation.js.map
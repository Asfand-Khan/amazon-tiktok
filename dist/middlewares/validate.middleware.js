import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';
export const validate = (schema) => async (req, res, next) => {
    try {
        const validatedData = await schema.parseAsync({
            body: req.body,
            query: req.query,
            params: req.params,
        });
        req.body = validatedData.body;
        req.query = validatedData.query;
        req.params = validatedData.params;
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            const errors = error.errors.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return next(new AppError('Validation Error', 400, errors));
        }
        next(error);
    }
};
//# sourceMappingURL=validate.middleware.js.map
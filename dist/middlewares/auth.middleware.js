import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { UserRepository } from '../repositories/user.repository.js';
import { SessionRepository } from '../repositories/session.repository.js';
const userRepository = new UserRepository();
const sessionRepository = new SessionRepository();
export const protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
        return next(new AppError('You are not logged in! Please log in to get access.', 401));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const session = await sessionRepository.findByToken(token);
    if (!session) {
        return next(new AppError('Session has expired or is invalid.', 401));
    }
    if (session.expiresAt < new Date()) {
        await sessionRepository.deleteByToken(token);
        return next(new AppError('Session has expired. Please log in again.', 401));
    }
    const currentUser = await userRepository.findById(decoded.id);
    if (!currentUser) {
        return next(new AppError('The user belonging to this token does no longer exist.', 401));
    }
    req.user = currentUser;
    next();
});
export const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('You do not have permission to perform this action', 403));
        }
        next();
    };
};
//# sourceMappingURL=auth.middleware.js.map
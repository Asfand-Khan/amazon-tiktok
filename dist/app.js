import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import { globalErrorHandler } from './middlewares/error.middleware.js';
import { requestLogger } from './middlewares/requestLogger.middleware.js';
import { AppError } from './utils/AppError.js';
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/auth.routes.js';
import clientRoutes from './routes/client.routes.js';
const app = express();
app.use(helmet());
app.use(cors());
app.options('*', cors());
app.use(requestLogger);
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(compression());
app.use('/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientRoutes);
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
export default app;
//# sourceMappingURL=app.js.map
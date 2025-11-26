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

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Implement CORS
app.use(cors());
app.options('*', cors());

// Request logging
app.use(requestLogger);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Compression
app.use(compression());

// 2) ROUTES
app.use('/health', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/clients', clientRoutes);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 3) GLOBAL ERROR HANDLER
app.use(globalErrorHandler);

export default app;

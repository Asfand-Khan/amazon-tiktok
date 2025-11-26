import dotenv from 'dotenv';
import { logger } from './utils/logger.js';

// Handle uncaught exceptions (must be before any other code)
process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();
import app from './app.js';

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  logger.info(`App running on port ${port}...`);
});

// Handle unhandled rejections
process.on('unhandledRejection', (err: any) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});

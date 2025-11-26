import dotenv from 'dotenv';
import { logger } from './utils/logger.js';
process.on('uncaughtException', (err) => {
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
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
//# sourceMappingURL=server.js.map
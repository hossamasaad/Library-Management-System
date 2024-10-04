import { createLogger, format, transports } from 'winston';
import config from '../config/index.js';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} ${level}: ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: config.logger.log_error_path, level: 'error' }), 
        new transports.File({ filename: config.logger.log_path })
    ]
});

export default logger;

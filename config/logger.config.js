import dotenv from 'dotenv'

dotenv.config();

const loggerConfig = {
    log_path: process.env.LOGGER_LOG_PATH,
    log_error_path: process.env.LOGGER_LOG_ERROR_PATH,
}

export default loggerConfig
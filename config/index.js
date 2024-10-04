import appConfig from "./app.config.js";
import dbConfig from "./db.config.js";
import loggerConfig from "./logger.config.js";

const config = {
    app: appConfig,
    db: dbConfig,
    logger: loggerConfig
}

export default config;
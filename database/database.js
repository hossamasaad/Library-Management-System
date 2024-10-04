import { Sequelize } from 'sequelize';
import config from '../config/index.js';
import logger from '../logger/logger.js';

const sequelize = new Sequelize(config.db.dbName, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql'
});


async function connectToDatabase() {
    try {
        await sequelize.authenticate();        
        logger.info('Connection to MySQL has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
}

export { sequelize, connectToDatabase };

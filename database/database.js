import { Sequelize } from 'sequelize';
import config from '../config/index.js';

const sequelize = new Sequelize(config.db.dbName, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'mysql'
});


async function connectToDatabase() {
    try {
        await sequelize.authenticate();        
        console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export { sequelize, connectToDatabase };

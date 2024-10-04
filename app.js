import config from './config/index.js';
import express from 'express';
import { sequelize, connectToDatabase } from './database/database.js';
import logger from './logger/logger.js';
import errorHandler from './Error/ErrorHandler.js';
import router from './routes/index.js';

import Book from './models/Book.js';
import Borrower from './models/Borrower.js';
import BorrowerBook from './models/BorrowerBook.js';
import User from './models/User.js';
import { addColors } from 'winston/lib/winston/config/index.js';

const port = config.app.port;

logger.info("Starting the application!")
const app = express();

logger.info("Connecting to database.")
connectToDatabase();

sequelize.sync().then(() => {
    logger.info("Database updated.");
});


app.use(express.json());
app.use('/api/v1', router);
app.use(errorHandler);


app.listen(port, () => {
    logger.info(`The server is running on port ${port}...`);
});

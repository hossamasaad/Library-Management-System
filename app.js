import config from './config/index.js';
import express from 'express';
import { sequelize, connectToDatabase } from './database/database.js';
import logger from './logger/logger.js';

import Book from './models/Book.js';
import Borrower from './models/Borrower.js';
import BorrowerBook from './models/BorrowerBook.js';
import User from './models/User.js';

const port = config.app.port;

logger.info("Starting the application!")
const app = express();

logger.info("Connecting to database.")
connectToDatabase();

sequelize.sync().then(() => {
    console.log('Database & tables created!');
});




app.listen(port, () => {
    console.log(`The server is running on port ${port}...`);
});

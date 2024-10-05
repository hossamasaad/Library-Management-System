import { DatabaseError, ValidationError } from "sequelize";
import logger from "../logger/logger.js";
import NotFoundError from "./NotFoundError.js";
import LoginError from "./LoginError.js";


const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err instanceof ValidationError) {
        statusCode = 400;
        message = err.message;
    } 
    else if (err instanceof DatabaseError) {
        statusCode = 500;
        message = err.message;
    }
    else if (err instanceof LoginError || err instanceof NotFoundError) {
        statusCode = err.statusCode;
        message = err.message
    }

    logger.error("Error Handler catches an exception: " + message)
    res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
    });
}

export default errorHandler;

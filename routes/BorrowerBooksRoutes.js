import { Router } from "express";
import { check } from "express-validator";
import BorrowerBookController from "../controllers/BorrowerBookController.js";
import RateLimiter from "../middlewares/RateLimiter.js";
import jwt from "../middlewares/jwt.js";
import validateInput from "../middlewares/validateInput.js";

const borrowerBookRouter = Router();

await borrowerBookRouter.post('/checkout', [
    check('borrowerId').isInt({ gt: 0 }).withMessage('Borrower ID must be a valid id'),
    check('bookId').isInt({ gt: 0 }).withMessage('Book ID must be a valid id'),
    check('dueDate')
    .isISO8601()
    .withMessage('dueDate is not valid.')
    .custom(value => {
        const currentDate = new Date();
        const dueDate = new Date(value);
        if (dueDate < currentDate) {
            throw new Error('dueDate cannot be in the past.');
        }
        return true;
    })
],
    RateLimiter.checkoutLimiter,
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser', 'Borrower']),
    validateInput,
    BorrowerBookController.checkoutBook
);

await borrowerBookRouter.post('/return', [
        check('borrowerId').isInt({ gt: 0 }).withMessage('Borrower ID must be a valid id'),
        check('bookId').isInt({ gt: 0 }).withMessage('Book ID must be a valid id'),
    ],
    RateLimiter.returnLimiter,
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser', 'Borrower']),
    validateInput,
    BorrowerBookController.returnBook
);


await borrowerBookRouter.get('/overdue', 
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser', 'Borrower']),
    validateInput,
    BorrowerBookController.getAllOverdueBooks
);

await borrowerBookRouter.get('/:id', [
    check('id').isInt({ gt: 0 }).withMessage('Id must be a valid id'),
], 
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser', 'Borrower']),
    validateInput,
    BorrowerBookController.getAllBorrowerBooks
);


export default borrowerBookRouter;
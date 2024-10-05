import { Router } from 'express';
import { check, validationResult } from 'express-validator';
import BorrowerController from '../controllers/BorrowerController.js';
import jwt from '../middlewares/jwt.js';
import validateInput from '../middlewares/validateInput.js';

const borrowerRouter = Router();

await borrowerRouter.post('/auth', [
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isStrongPassword().withMessage('Password is not strong')
],
    validateInput,
    BorrowerController.authenticateBorrower
)

await borrowerRouter.post('/register', [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isStrongPassword().withMessage('Password is not strong')
], 
    validateInput,
    BorrowerController.registerBorrower
)

await borrowerRouter.put('/:id', [
    check('id').isInt({ gt: 0 }).withMessage('Borrower ID must be a valid id'),
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
    check('password').isStrongPassword().withMessage('Password is not strong')
],
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser', 'Borrower']), 
    validateInput,
    BorrowerController.updateBorrower
);

await borrowerRouter.delete('/:id',
    [check('id').isInt({ gt: 0 }).withMessage('Borrower ID must be a valid id')],
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin']),
    validateInput,
    BorrowerController.deleteBorrower
);

await borrowerRouter.get('/',
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser']),
    validateInput,
    BorrowerController.getAllBorrowers
);

export default borrowerRouter;
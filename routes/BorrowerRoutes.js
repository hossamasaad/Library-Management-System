import { Router } from 'express';
import { check } from 'express-validator';
import BorrowerController from '../controllers/BorrowerController.js';

const borrowerRouter = Router();

await borrowerRouter.put('/:id', [
    check('id').isInt({ gt: 0 }).withMessage('Borrower ID must be a valid id'),
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Invalid email format'),
], BorrowerController.updateBorrower);

await borrowerRouter.delete('/:id',
    [check('id').isInt({ gt: 0 }).withMessage('Borrower ID must be a valid id')],
    BorrowerController.deleteBorrower
);

await borrowerRouter.get('/',
    BorrowerController.getAllBorrowers
);

export default borrowerRouter;
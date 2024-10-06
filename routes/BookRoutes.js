import { Router } from 'express';
import { check } from 'express-validator';
import BookController from '../controllers/BookController.js';
import jwt from '../middlewares/jwt.js';
import validateInput from '../middlewares/validateInput.js';

const bookRouter = Router();

await bookRouter.get('/:id',
    [check('id').isInt({ gt: 0 }).withMessage('Book ID must be a valid id')],
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser', 'Borrower']),
    BookController.getBookById
);

await bookRouter.post('/',[
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('ISBN').notEmpty().withMessage('Invalid ISBN'),
    check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    check('shelfLocation').optional().isString().withMessage('Shelf Location must be a string')
], 
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser']),
    validateInput,
    BookController.addBook
)

await bookRouter.put('/:id',[
    check('id').isInt({ gt: 0 }).withMessage('Book ID must be a valid id'),
    check('title').notEmpty().withMessage('Title is required'),
    check('author').notEmpty().withMessage('Author is required'),
    check('ISBN').notEmpty().withMessage('Invalid ISBN'),
    check('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
    check('shelfLocation').optional().isString().withMessage('Shelf Location must be a string')
], 
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser']),
    validateInput,
    BookController.updateBook
)

await bookRouter.delete('/:id',
    [check('id').isInt({ gt: 0 }).withMessage('Book ID must be a valid id')],
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin']),
    validateInput,
    BookController.deleteBook
);

await bookRouter.get('/',
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser']),
    validateInput,
    BookController.getAllBooks
);

await bookRouter.get('/search/:text',
    check('text').notEmpty().withMessage('text is required'),
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin', 'SystemUser', 'Borrower']),
    validateInput,
    BookController.searchBooks
);

export default bookRouter;


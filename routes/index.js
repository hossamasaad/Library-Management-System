import { Router } from 'express';
import bookRouter from './BookRoutes.js';
import borrowerRouter from './BorrowerRoutes.js';
import borrowerBookRouter from './BorrowerBooksRoutes.js';
import userRouter from './UserRoutes.js';

const router = Router();

router.use('/books', bookRouter);
router.use('/borrowers', borrowerRouter);
router.use('/borrowerBooks', borrowerBookRouter);
router.use('/users', userRouter);

export default router;
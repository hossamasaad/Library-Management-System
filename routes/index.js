import { Router } from 'express';
import bookRouter from './BookRoutes.js';
import borrowerRouter from './BorrowerRoutes.js';

const router = Router();

router.use('/books', bookRouter);
router.use('/borrowers', borrowerRouter);

export default router;
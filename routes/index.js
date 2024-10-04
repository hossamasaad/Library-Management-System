import { Router } from 'express';
import bookRouter from './BookRoutes.js';

const router = Router();

router.use('/books', bookRouter);

export default router;
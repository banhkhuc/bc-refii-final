import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { createAccount, login } from './controller';

const router = Router();

router.post('/create', [verifyToken, verifyAdmin], createAccount);
router.post('/login', login);

export default router;

import { Router } from 'express';
import { getUsers, getUser, deleteUser, getMe, changeInfo,changeFacilityInfo, changePassword, verifyPassword } from './controller';
import { verifyToken, verifyAdmin } from 'middlewares';

const router = Router();

router.get('/me', [verifyToken], getMe);
router.put('/change-info', [verifyToken], changeInfo);
router.put('/change-facility-info', [verifyToken], changeFacilityInfo);
router.put('/change-password', [verifyToken], changePassword);
router.post('/verify-password', [verifyToken], verifyPassword);

router.get('/pagination', [verifyToken, verifyAdmin], getUsers);
router.get('/:id', [verifyToken, verifyAdmin], getUser);
router.delete('/:id', [verifyToken, verifyAdmin], deleteUser);

export default router;

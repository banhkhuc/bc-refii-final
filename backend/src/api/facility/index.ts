import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { getFacilities, getFacility, addFacility, deleteFacility, getAllFacilities } from './controller';

const router = Router();

router.get('/pagination', [verifyToken, verifyAdmin], getFacilities);
router.get('/:id', [verifyToken, verifyAdmin], getFacility);
router.get('/', [verifyToken], getAllFacilities);
router.post('/', [verifyToken, verifyAdmin], addFacility);
router.delete('/:id', [verifyToken, verifyAdmin], deleteFacility);

export default router;

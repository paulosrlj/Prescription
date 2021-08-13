import { Router } from 'express';

import ListAllImagesController from '../controllers/image/ListAllImagesController';
import DeleteImageController from '../controllers/image/DeleteImageController';

import { verifyAuthenticationToken as adminAuthentication } from '../middlewares/admin/verifyAuthenticationToken';
import { verifyAuthenticationToken } from '../middlewares/doctor/verifyAuthenticationToken';

const router = Router();

router.get('/', adminAuthentication, ListAllImagesController.handle);
router.delete('/:id', verifyAuthenticationToken, DeleteImageController.handle);

export default router;

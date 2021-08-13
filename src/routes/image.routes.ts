import { Router } from 'express';
import multer from 'multer';

import CreateImageController from '../controllers/image/CreateImageController';
import ListImageController from '../controllers/image/ListImageController';
import ListAllImagesController from '../controllers/image/ListAllImagesController';
import DeleteImageController from '../controllers/image/DeleteImageController';

import uploadConfig from '../config/upload';
import { verifyAuthenticationToken as adminAuthentication } from '../middlewares/admin/verifyAuthenticationToken';
import { verifyAuthenticationToken } from '../middlewares/doctor/verifyAuthenticationToken';

const router = Router();
const upload = multer(uploadConfig);

router.get('/', adminAuthentication, ListAllImagesController.handle);
router.get('/:id', ListImageController.handle);
router.post(
  '/',
  upload.array('images'),
  verifyAuthenticationToken,
  CreateImageController.handle,
);
router.delete('/:id', verifyAuthenticationToken, DeleteImageController.handle);

export default router;

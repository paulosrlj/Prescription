import { Router } from 'express';
import multer from 'multer';

import ListAllImagesController from '../controllers/image/ListAllImagesController';
import DeleteImageController from '../controllers/image/DeleteImageController';

import { verifyAuthenticationToken as adminAuthentication } from '../middlewares/admin/verifyAuthenticationToken';
import { verifyAuthenticationToken } from '../middlewares/doctor/verifyAuthenticationToken';
import uploadConfig from '../config/upload';
import CreateImageController from '../controllers/image/CreateImageController';

const router = Router();
const upload = multer(uploadConfig);

router.get('/', adminAuthentication, ListAllImagesController.handle);
router.post(
  '/',
  upload.array('images'),
  verifyAuthenticationToken,
  CreateImageController.handle,
);
router.delete('/:id', verifyAuthenticationToken, DeleteImageController.handle);

export default router;

import { Router } from 'express';
import multer from 'multer';

import CreateRecipeController from '../controllers/recipe/CreateRecipeController';
import ListAllRecipeController from '../controllers/recipe/ListAllRecipeController.ts';
import ListRecipeController from '../controllers/recipe/ListRecipeController';
import DueRecipeController from '../controllers/recipe/DueRecipeController';

import uploadConfig from '../config/upload';
import { verifyAuthenticationToken } from '../middlewares/doctor/verifyAuthenticationToken';

const router = Router();
const upload = multer(uploadConfig);

router.get('/', ListAllRecipeController.handle);
router.get('/:id', ListRecipeController.handle);
router.post(
  '/',
  upload.array('images'),
  verifyAuthenticationToken,
  CreateRecipeController.handle,
);
// vencer uma receita
router.put(
  '/duerecipe/:id',
  verifyAuthenticationToken,
  DueRecipeController.handle,
);

export default router;

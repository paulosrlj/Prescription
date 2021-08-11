import { Router } from 'express';

import CreateRecipeController from '../controllers/recipe/CreateRecipeController';
import ListAllRecipeController from '../controllers/recipe/ListAllRecipeController.ts';
import ListRecipeController from '../controllers/recipe/ListRecipeController';

import { verifyAuthenticationToken } from '../middlewares/doctor/verifyAuthenticationToken';

const router = Router();

router.get('/', ListAllRecipeController.handle);
router.get('/:id', ListRecipeController.handle);
router.post('/', verifyAuthenticationToken, CreateRecipeController.handle);

export default router;

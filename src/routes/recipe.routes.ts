import { Router } from 'express';

import CreateRecipeController from '../controllers/recipe/CreateRecipeController';
import ListAllRecipeController from '../controllers/recipe/ListAllRecipeController.ts';
import ListRecipeController from '../controllers/recipe/ListRecipeController';
// import UpdateRecipeController from '../controllers/recipe/UpdateRecipeController';

import { verifyAuthenticationToken } from '../middlewares/doctor/verifyAuthenticationToken';

const router = Router();

router.get('/', ListAllRecipeController.handle);
router.get('/:id', ListRecipeController.handle);
router.post('/', verifyAuthenticationToken, CreateRecipeController.handle);
// router.put('/:id', verifyAuthenticationToken, UpdateRecipeController.handle);

export default router;

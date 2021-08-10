import { Router } from 'express';

import CreateRecipeController from '../controllers/recipe/CreateRecipeController';
import ListAllRecipeController from '../controllers/recipe/ListAllRecipeController.ts';
import ListRecipeController from '../controllers/recipe/ListRecipeController';

const router = Router();

router.get('/', ListAllRecipeController.handle);
router.get('/:id', ListRecipeController.handle);
router.post('/', CreateRecipeController.handle);

export default router;

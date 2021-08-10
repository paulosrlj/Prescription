import { Router } from 'express';

import CreateRecipeController from '../controllers/recipe/CreateRecipeController';
import ListAllRecipeController from '../controllers/recipe/ListAllRecipeController.ts';

const router = Router();

router.get('/', ListAllRecipeController.handle);
router.post('/', CreateRecipeController.handle);

export default router;

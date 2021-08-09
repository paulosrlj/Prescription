import { Router } from 'express';

import CreateRecipeController from '../controllers/recipe/CreateRecipeController';
// import ListPatientController from '../controllers/recipe/ListRecipeController';
// import DeleteRecipeController from '../controllers/recipe/DeleteRecipeController';
// import AuthenticationController from '../controllers/recipe/AuthenticationController';
// import verifyAuthenticationToken from '../../middleware/patient/verifyAuthenticationToken';

const router = Router();

// router.get('/', ListPatientController.handle);
router.post('/', CreateRecipeController.handle);

export default router;

import { Router } from 'express';

import ListPointController from '../controllers/point/ListPointController';
import AuthenticationController from '../controllers/point/AuthenticationController';
// import verifyAuthenticationToken from '../../middleware/patient/verifyAuthenticationToken';

const router = Router();

router.get('/', ListPointController.handle);
router.post('/login', AuthenticationController.handle);

export default router;

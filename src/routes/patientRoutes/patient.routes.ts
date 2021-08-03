import { Router } from 'express';

import ListPatientController from '../../controllers/patient/ListPatientController';
import CreatePatientController from '../../controllers/patient/CreatePatientController';

const router = Router();

router.get('/', ListPatientController.handle);
router.post('/', CreatePatientController.handle);

export default router;

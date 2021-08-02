import { Router } from 'express';

import ListPatientController from './controllers/ListPatientController';
import CreatePatientController from './controllers/CreatePatientController';

const router = Router();

router.get('/patients', ListPatientController.handle);
router.post('/patients', CreatePatientController.handle);

export default router;

import { Router } from 'express';

import PatientController from './controllers/PatientController';

const router = Router();

router.post('/patients', PatientController.handle);

export default router;

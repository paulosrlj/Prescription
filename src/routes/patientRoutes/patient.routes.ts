import { Router } from 'express';

import ListPatientController from '../../controllers/patient/ListPatientController';
import CreatePatientController from '../../controllers/patient/CreatePatientController';
import DeletePatientController from '../../controllers/patient/DeletePatientController';

const router = Router();

router.get('/', ListPatientController.handle);
router.post('/', CreatePatientController.handle);
// router.delete('/:id', DeletePatientController.handle);

export default router;

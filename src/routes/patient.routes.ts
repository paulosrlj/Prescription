import { Router } from 'express';

import ListPatientController from '../controllers/patient/ListPatientController';
import CreatePatientController from '../controllers/patient/CreatePatientController';
import DeletePatientController from '../controllers/patient/DeletePatientController';
import AuthenticationController from '../controllers/patient/AuthenticationController';
import UpdatePatientController from '../controllers/patient/UpdatePatientController';
// import verifyAuthenticationToken from '../../middleware/patient/verifyAuthenticationToken';

const router = Router();

router.get('/', ListPatientController.handle);
router.post('/', CreatePatientController.handle);
router.post('/login', AuthenticationController.handle);
router.put('/', UpdatePatientController.handle);
router.delete('/:cpf', DeletePatientController.handle);

export default router;

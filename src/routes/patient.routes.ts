import { Router } from 'express';

import ListAllPatientController from '../controllers/patient/ListAllPatientController';
import ListPatientController from '../controllers/patient/ListPatientController';
import CreatePatientController from '../controllers/patient/CreatePatientController';
import DeletePatientController from '../controllers/patient/DeletePatientController';
import AuthenticationController from '../controllers/patient/AuthenticationController';
import UpdatePatientController from '../controllers/patient/UpdatePatientController';
import { verifyAuthenticationToken as adminAuthentication } from '../middlewares/admin/verifyAuthenticationToken';
import { verifyAuthenticationToken } from '../middlewares/patient/verifyAuthenticationToken';

const router = Router();

// Só um admin pode listar os usuários
router.get('/', adminAuthentication, ListAllPatientController.handle);
router.get('/:cpf', verifyAuthenticationToken, ListPatientController.handle);

router.post('/', CreatePatientController.handle);
router.put('/', verifyAuthenticationToken, UpdatePatientController.handle);
router.delete('/', verifyAuthenticationToken, DeletePatientController.handle);

router.post('/login', AuthenticationController.handle);

export default router;

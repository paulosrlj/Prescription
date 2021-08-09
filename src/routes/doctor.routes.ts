import { Router } from 'express';

import ListDoctorController from '../controllers/doctor/ListDoctorController';
import CreateDoctorController from '../controllers/doctor/CreateDoctorController';
import DeleteDoctorController from '../controllers/doctor/DeleteDoctorController';
import AuthenticationController from '../controllers/doctor/AuthenticationController';
// import verifyAuthenticationToken from '../../middleware/doctor/verifyAuthenticationToken';

const router = Router();

// router.get('/', ListDoctorController.handle);
router.post('/', CreateDoctorController.handle);
// router.post('/login', AuthenticationController.handle);
// router.delete('/:crm', DeleteDoctorController.handle);

export default router;

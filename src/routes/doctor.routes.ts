import { Router } from 'express';

import ListDoctorController from '../controllers/doctor/ListDoctorController';
import CreateDoctorController from '../controllers/doctor/CreateDoctorController';
import DeleteDoctorController from '../controllers/doctor/DeleteDoctorController';
import UpdateDoctorController from '../controllers/doctor/UpdateDoctorController';

import AuthenticationController from '../controllers/doctor/AuthenticationController';

import { verifyAuthenticationToken } from '../middlewares/doctor/verifyAuthenticationToken';
import { verifyAuthenticationToken as adminAuthentication } from '../middlewares/admin/verifyAuthenticationToken';

const router = Router();

router.get('/:crm', adminAuthentication, ListDoctorController.handle);
router.post('/', CreateDoctorController.handle);
router.post('/login', AuthenticationController.handle);
router.put('/', verifyAuthenticationToken, UpdateDoctorController.handle);

router.delete(
  '/:crm',
  verifyAuthenticationToken,
  DeleteDoctorController.handle,
);

export default router;

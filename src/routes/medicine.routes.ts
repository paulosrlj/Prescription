import { Router } from 'express';

import ListAllMedicineController from '../controllers/medicine/ListAllMedicineController';
import CreateMedicineController from '../controllers/medicine/CreateMedicineController';
import DeleteMedicineController from '../controllers/medicine/DeleteMedicineController';
import UpdateMedicineController from '../controllers/medicine/UpdateMedicineController';
import { verifyAuthenticationToken as adminAuthentication } from '../middlewares/admin/verifyAuthenticationToken';

const router = Router();

router.get('/', ListAllMedicineController.handle);
router.post('/', adminAuthentication, CreateMedicineController.handle);
router.put('/', adminAuthentication, UpdateMedicineController.handle);
router.delete(
  '/:idRegister',
  adminAuthentication,
  DeleteMedicineController.handle,
);

export default router;

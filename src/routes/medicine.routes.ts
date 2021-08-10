import { Router } from 'express';

import ListAllMedicineController from '../controllers/medicine/ListAllMedicineController';
import CreateMedicineController from '../controllers/medicine/CreateMedicineController';
import DeleteMedicineController from '../controllers/medicine/DeleteMedicineController';
import { verifyAuthenticationToken as adminAuthentication } from '../middlewares/admin/verifyAuthenticationToken';

const router = Router();

router.get('/', ListAllMedicineController.handle);
router.post('/', adminAuthentication, CreateMedicineController.handle);
router.delete('/:id', adminAuthentication, DeleteMedicineController.handle);

export default router;

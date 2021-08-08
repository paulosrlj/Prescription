import { Router } from 'express';

import ListAllMedicineController from '../controllers/medicine/ListAllMedicineController';
import CreateMedicineController from '../controllers/medicine/CreateMedicineController';
import DeleteMedicineController from '../controllers/medicine/DeleteMedicineController';

const router = Router();

router.get('/', ListAllMedicineController.handle);
router.post('/', CreateMedicineController.handle);
router.delete('/:id', DeleteMedicineController.handle);

export default router;

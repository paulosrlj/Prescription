import { Router } from 'express';

import ListMedicineController from '../controllers/medicine/ListMedicineController';
import CreateMedicineController from '../controllers/medicine/CreateMedicineController';
import DeleteMedicineController from '../controllers/medicine/DeleteMedicineController';

const router = Router();

router.get('/', ListMedicineController.handle);
router.post('/', CreateMedicineController.handle);
router.delete('/:id', DeleteMedicineController.handle);

export default router;

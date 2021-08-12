import { Router } from 'express';

import ListAllMedicineController from '../controllers/medicine/ListAllMedicineController';
import CreateMedicineController from '../controllers/medicine/CreateMedicineController';
import DeleteMedicineController from '../controllers/medicine/DeleteMedicineController';
import UpdateMedicineController from '../controllers/medicine/UpdateMedicineController';

const router = Router();

router.get('/', ListAllMedicineController.handle);
router.post('/', CreateMedicineController.handle);
router.delete('/:idRegister', DeleteMedicineController.handle);
router.put('/', UpdateMedicineController.handle);

export default router;

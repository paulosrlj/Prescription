import { Router } from 'express';

import ListDrugstoreController from '../controllers/drugstore/ListDrugstoreController';
import CreateDrugstoreController from '../controllers/drugstore/CreateDrugstoreController';

const router = Router();

router.get('/', ListDrugstoreController.handle);
router.post('/', CreateDrugstoreController.handle);

export default router;

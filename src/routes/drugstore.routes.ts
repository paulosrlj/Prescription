import { Router } from 'express';

import ListDrugstoreController from '../controllers/drugstore/ListDrugstoreController';
import CreateDrugstoreController from '../controllers/drugstore/CreateDrugstoreController';

import { verifyAuthenticationToken } from '../middlewares/admin/verifyAuthenticationToken';

const router = Router();

router.get('/', ListDrugstoreController.handle);
router.post('/', verifyAuthenticationToken, CreateDrugstoreController.handle);

export default router;

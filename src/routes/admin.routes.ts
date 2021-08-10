import { Router } from 'express';

import CreateAdminController from '../controllers/admin/CreateAdminController';
import DeleteAdminController from '../controllers/admin/DeleteAdminController';
import AuthenticationController from '../controllers/admin/AuthenticationController';

const router = Router();

router.post('/', CreateAdminController.handle);
router.delete('/', DeleteAdminController.handle);
router.post('/login', AuthenticationController.handle);

export default router;

import { Router } from 'express';

import ListCardController from '../../controllers/card/ListCardController';

const router = Router();

router.get('/', ListCardController.handle);

export default router;

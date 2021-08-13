import { Request, Response } from 'express';
import SQLiteDrugstoreRepository from '../../repositories/implementations/SQLiteDrugstoreRepository';

import ListDrugstoreService from '../../services/drugstore/ListDrugstoreService';

class ListDrugstoreController {
  async handle(req: Request, res: Response) {
    const listDrugstoreService = new ListDrugstoreService(
      new SQLiteDrugstoreRepository(),
    );

    const drugstores = await listDrugstoreService.execute();

    return res.json(drugstores);
  }
}

export default new ListDrugstoreController();

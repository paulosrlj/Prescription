import { Request, Response } from 'express';

import IDrugstore from '../../dto/IDrugstoreRequest';
import SQLiteDrugstoreRepository from '../../repositories/implementations/SQLiteDrugstoreRepository';
import CreateDrugstoreService from '../../services/drugstore/CreateDrugstoreService';

class CreateDrugstoreController {
  async handle(req: Request, res: Response) {
    const { name, lat, lng } = req.body as unknown as IDrugstore;

    const createDrugstoreService = new CreateDrugstoreService(
      new SQLiteDrugstoreRepository(),
    );

    const drugstore = await createDrugstoreService.execute({
      name,
      lat,
      lng,
    });

    if (!drugstore) return res.status(401).json(null);

    return res.status(200).json(drugstore);
  }
}

export default new CreateDrugstoreController();

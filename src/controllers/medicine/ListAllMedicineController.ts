import { Request, Response } from 'express';
import SQLiteMedicineRepository from '../../repositories/implementations/SQLiteMedicineRepository';

import ListAllMedicineService from '../../services/medicine/ListAllMedicineService';

class ListAllMedicineController {
  async handle(req: Request, res: Response) {
    const listAllMedicineService = new ListAllMedicineService(
      new SQLiteMedicineRepository(),
    );

    const medicines = await listAllMedicineService.execute();

    return res.json(medicines);
  }
}

export default new ListAllMedicineController();

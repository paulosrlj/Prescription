import { Request, Response } from 'express';
import SQLiteMedicineRepository from '../../repositories/implementations/SQLiteMedicineRepository';

import FindMedicineByNameService from '../../services/medicine/FindMedicineByNameService';

class FindMedicineByNameController {
  async handle(req: Request, res: Response) {
    const { nome } = req.params;

    const findMedicineByName = new FindMedicineByNameService(
      new SQLiteMedicineRepository(),
    );

    const medicines = await findMedicineByName.execute(nome);

    return res.json(medicines);
  }
}

export default new FindMedicineByNameController();

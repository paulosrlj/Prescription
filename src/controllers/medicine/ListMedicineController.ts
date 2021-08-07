import { Request, Response } from 'express';

import ListMedicineService from '../../services/medicine/ListMedicineService';

class ListMedicineController {
  async handle(req: Request, res: Response) {
    const listMedicineService = new ListMedicineService();

    const Medicines = await listMedicineService.execute();

    return res.json(Medicines);
  }
}

export default new ListMedicineController();

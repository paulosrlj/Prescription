import { Request, Response } from 'express';

import ListAllMedicineService from '../../services/medicine/ListAllMedicineService';

class ListAllMedicineController {
  async handle(req: Request, res: Response) {
    const listAllMedicineService = new ListAllMedicineService();

    const medicines = await listAllMedicineService.execute();

    return res.json(medicines);
  }
}

export default new ListAllMedicineController();

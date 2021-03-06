import { Request, Response } from 'express';
import SQLiteMedicineRepository from '../../repositories/implementations/SQLiteMedicineRepository';

import DeleteMedicineService from '../../services/medicine/DeleteMedicineService';

class DeleteMedicineController {
  async handle(req: Request, res: Response) {
    const { idRegister } = req.params;

    const deleteMedicineService = new DeleteMedicineService(
      new SQLiteMedicineRepository(),
    );

    await deleteMedicineService.execute(idRegister);

    return res.status(200).json({ message: 'Medicine removed' });
  }
}

export default new DeleteMedicineController();

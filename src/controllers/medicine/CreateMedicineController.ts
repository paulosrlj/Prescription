import { Request, Response } from 'express';

import IMedicine from '../../dto/IMedicineRequest';
import CreateMedicineService from '../../services/medicine/CreateMedicineService';
import SQLiteMedicineRepository from '../../repositories/implementations/SQLiteMedicineRepository';

class MedicineController {
  async handle(req: Request, res: Response) {
    const {
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
      dosagem,
    } = req.body as unknown as IMedicine;

    const createMedicineService = new CreateMedicineService(
      new SQLiteMedicineRepository(),
    );

    const medicine = await createMedicineService.execute({
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
      dosagem,
    });

    return res.json(medicine);
  }
}

export default new MedicineController();

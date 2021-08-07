import { Request, Response } from 'express';

import IMedicine from '../../dto/IMedicineRequest';
import CreateMedicineService from '../../services/medicine/CreateMedicineService';

class MedicineController {
  async handle(req: Request, res: Response) {
    const {
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
    } = req.body as unknown as IMedicine;

    const createMedicineService = new CreateMedicineService();

    const medicine = await createMedicineService.execute({
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
    });

    return res.json(medicine);
  }
}

export default new MedicineController();

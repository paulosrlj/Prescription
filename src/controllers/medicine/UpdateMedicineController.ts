import { Request, Response } from 'express';

import UpdateMedicineService from '../../services/medicine/UpdateMedicineService';

import IMedicineRequest from '../../dto/IMedicineRequest';

class MedicineController {
  async handle(req: Request, res: Response) {
    const updateMedicineService = new UpdateMedicineService();

    const {
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
      dosagem,
    } = req.body as IMedicineRequest;

    await updateMedicineService.execute({
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
      dosagem,
    });

    return res.status(200).json({ message: 'Medicine updated succefully!' });
  }
}

export default new MedicineController();

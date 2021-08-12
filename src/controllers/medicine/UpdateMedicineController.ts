import { Request, Response } from 'express';

import UpdateMedicineService from '../../services/medicine/UpdateMedicineService';

class MedicineController {
  async handle(req: Request, res: Response) {
    const updateMedicineService = new UpdateMedicineService();

    const medicine = await updateMedicineService.execute(req.body);

    if (!medicine) return res.status(401).json(null);

    return res.status(200).json({ message: 'Medicine updated succefully!' });
  }
}

export default new MedicineController();

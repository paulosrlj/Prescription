import { Request, Response } from 'express';

import DeleteDoctorService from '../../services/doctor/DeleteDoctorService';

class DeleteDoctorController {
  async handle(req: Request, res: Response) {
    const { crm } = req.params;

    const deleteDoctorService = new DeleteDoctorService();

    await deleteDoctorService.execute(crm);

    return res.status(200).json({ message: 'Doctor removed' });
  }
}

export default new DeleteDoctorController();

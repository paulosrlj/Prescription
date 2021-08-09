import { Request, Response } from 'express';

import ListDoctorService from '../../services/doctor/ListDoctorService';

class ListDoctorController {
  async handle(req: Request, res: Response) {
    const { crm } = req.params;
    const listDoctorService = new ListDoctorService();

    const doctor = await listDoctorService.execute(crm);

    return res.json(doctor);
  }
}

export default new ListDoctorController();

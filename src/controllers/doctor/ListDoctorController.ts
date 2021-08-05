import { Request, Response } from 'express';

import ListDoctorService from '../../services/doctor/ListDoctorService';

class ListDoctorController {
  async handle(req: Request, res: Response) {
    const listDoctorService = new ListDoctorService();

    const doctors = await listDoctorService.execute();

    return res.json(doctors);
  }
}

export default new ListDoctorController();

import { Request, Response } from 'express';
import SQLiteDoctorRepository from '../../repositories/implementations/SQLiteDoctorRepository';

import ListDoctorService from '../../services/doctor/ListDoctorService';
import { handleDoctor } from '../../views/doctorsViews';

class ListDoctorController {
  async handle(req: Request, res: Response) {
    const { crm } = req.params;
    const listDoctorService = new ListDoctorService(
      new SQLiteDoctorRepository(),
    );

    const doctor = await listDoctorService.execute(crm);
    console.log('doc', doctor);
    const doctorFiltered = handleDoctor(doctor);

    return res.json(doctorFiltered);
  }
}

export default new ListDoctorController();

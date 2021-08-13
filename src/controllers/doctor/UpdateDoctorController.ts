import { Request, Response } from 'express';
import IDoctor from '../../dto/IDoctorRequest';
import SQLiteDoctorRepository from '../../repositories/implementations/SQLiteDoctorRepository';

import UpdateDoctorService from '../../services/doctor/UpdateDoctorService';

class UpdateDoctorController {
  async handle(req: Request, res: Response) {
    const updateDoctorService = new UpdateDoctorService(
      new SQLiteDoctorRepository(),
    );

    const { birth_date, password, phone, email, name } = req.body as IDoctor;
    const crm = req.doctor_crm;

    await updateDoctorService.execute({
      crm,
      birth_date,
      password,
      phone,
      email,
      name,
    });

    return res.status(200).json({ message: 'Doctor updated succefully!' });
  }
}

export default new UpdateDoctorController();

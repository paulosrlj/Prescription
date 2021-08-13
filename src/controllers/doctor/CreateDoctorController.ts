import { Request, Response } from 'express';

import IDoctor from '../../dto/IDoctorRequest';
import SQLiteDoctorRepository from '../../repositories/implementations/SQLiteDoctorRepository';
import CreateDoctorService from '../../services/doctor/CreateDoctorService';

class CreateDoctorController {
  async handle(req: Request, res: Response) {
    const { name, email, password, birth_date, phone, crm } =
      req.body as unknown as IDoctor;

    const createDoctorService = new CreateDoctorService(
      new SQLiteDoctorRepository(),
    );

    const doctor = await createDoctorService.execute({
      name,
      email,
      password,
      birth_date,
      phone,
      crm,
    });

    if (!doctor) return res.status(401).json(null);

    return res.status(200).json(doctor);
  }
}

export default new CreateDoctorController();

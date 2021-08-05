import { Request, Response } from 'express';

import IDoctor from '../../dto/IDoctorRequest';
import CreateDoctorService from '../../services/doctor/CreateDoctorService';

class DoctorController {
  async handle(req: Request, res: Response) {
    const { name, email, password, birthDate, phone, crm } =
      req.body as unknown as IDoctor;

    const createPatientService = new CreateDoctorService();

    const patient = await createPatientService.execute({
      name,
      email,
      password,
      birthDate,
      phone,
      crm,
    });

    return res.json(patient);
  }
}

export default new DoctorController();

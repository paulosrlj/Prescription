import { Request, Response } from 'express';

import IDoctor from '../../dto/IDoctorRequest';
import CreateDoctorService from '../../services/doctor/CreateDoctorService';

class CreateDoctorController {
  async handle(req: Request, res: Response) {
    const { name, email, password, birthDate, phone, crm } =
      req.body as unknown as IDoctor;

    const createDoctorService = new CreateDoctorService();

    const doctor = await createDoctorService.execute({
      name,
      email,
      password,
      birthDate,
      phone,
      crm,
    });

    if (!doctor) return res.status(401).json(null);

    return res.status(200).json(doctor);
  }
}

export default new CreateDoctorController();

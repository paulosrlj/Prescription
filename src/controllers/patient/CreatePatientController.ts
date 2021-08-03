import { Request, Response } from 'express';

import IPatient from '../../dto/IPatientRequest';
import CreatePatientService from '../../services/patient/CreatePatientService';

class PatientController {
  async handle(req: Request, res: Response) {
    const { name, email, password, birthDate, phone, cpf } =
      req.body as unknown as IPatient;

    const createPatientService = new CreatePatientService();

    const patient = await createPatientService.execute({
      name,
      email,
      password,
      birthDate,
      phone,
      cpf,
    });

    return res.json(patient);
  }
}

export default new PatientController();

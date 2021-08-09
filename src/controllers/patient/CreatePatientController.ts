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

    if (!patient) return res.status(401).json(null);

    return res.status(200).json(patient);
  }
}

export default new PatientController();

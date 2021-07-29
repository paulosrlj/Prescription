import { Request, Response } from 'express';

import IPatient from '../dto/IPatientRequest';
import PatientService from '../services/PatientService';

class PatientController {
  async handle(req: Request, res: Response) {
    const { name, email, password, birthDate, phone, cpf } =
      req.body as unknown as IPatient;

    const patientService = new PatientService();
    const patient = await patientService.execute({
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

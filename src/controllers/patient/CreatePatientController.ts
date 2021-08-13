import { Request, Response } from 'express';

import SQLitePatientRepository from '../../repositories/implementations/SQLitePatientRepository';
import IPatient from '../../dto/IPatientRequest';
import CreatePatientService from '../../services/patient/CreatePatientService';

class CreatePatientController {
  async handle(req: Request, res: Response) {
    const { name, email, password, birth_date, phone, cpf } =
      req.body as IPatient;

    const createPatientService = new CreatePatientService(
      new SQLitePatientRepository(),
    );
    const patient = await createPatientService.execute({
      name,
      email,
      password,
      birth_date,
      phone,
      cpf,
    });

    if (!patient) return res.status(401).json(null);

    return res.status(200).json(patient);
  }
}

export default new CreatePatientController();

import { Request, Response } from 'express';

import ListAllPatientService from '../../services/patient/ListAllPatientService';
import SQLitePatientRepository from '../../repositories/implementations/SQLitePatientRepository';

class ListAllPatientController {
  async handle(req: Request, res: Response) {
    const listPatientService = new ListAllPatientService(
      new SQLitePatientRepository(),
    );

    const patients = await listPatientService.execute();

    return res.json(patients);
  }
}

export default new ListAllPatientController();

import { Request, Response } from 'express';

import ListPatientService from '../../services/patient/ListPatientService';
import SQLitePatientRepository from '../../repositories/implementations/SQLitePatientRepository';

class ListAllPatientController {
  async handle(req: Request, res: Response) {
    const { cpf } = req.params;
    const listPatientService = new ListPatientService(
      new SQLitePatientRepository(),
    );

    const patient = await listPatientService.execute(cpf);

    return res.json(patient);
  }
}

export default new ListAllPatientController();

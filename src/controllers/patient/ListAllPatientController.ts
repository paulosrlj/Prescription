import { Request, Response } from 'express';

import ListAllPatientService from '../../services/patient/ListAllPatientService';
import SQLitePatientRepository from '../../repositories/implementations/SQLitePatientRepository';
import { handlePatient } from '../../views/patientsViews';

class ListAllPatientController {
  async handle(req: Request, res: Response) {
    const listPatientService = new ListAllPatientService(
      new SQLitePatientRepository(),
    );

    const patients = await listPatientService.execute();

    const patientsFiltered = patients.map(p => handlePatient(p));

    return res.json(patientsFiltered);
  }
}

export default new ListAllPatientController();

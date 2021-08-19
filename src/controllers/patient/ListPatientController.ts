import { Request, Response } from 'express';

import ListPatientService from '../../services/patient/ListPatientService';
import SQLitePatientRepository from '../../repositories/implementations/SQLitePatientRepository';
import { handlePatient } from '../../views/patientsViews';

class ListAllPatientController {
  async handle(req: Request, res: Response) {
    const { cpf } = req.params;
    const listPatientService = new ListPatientService(
      new SQLitePatientRepository(),
    );

    const patient = await listPatientService.execute(cpf);

    const patientFiltered = handlePatient(patient);

    return res.json(patientFiltered);
  }
}

export default new ListAllPatientController();

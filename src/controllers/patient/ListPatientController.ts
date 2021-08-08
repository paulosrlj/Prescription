import { Request, Response } from 'express';

import ListPatientService from '../../services/patient/ListPatientService';

class ListAllPatientController {
  async handle(req: Request, res: Response) {
    const { cpf } = req.params;
    const listPatientService = new ListPatientService();

    const patient = await listPatientService.execute(cpf);

    return res.json(patient);
  }
}

export default new ListAllPatientController();

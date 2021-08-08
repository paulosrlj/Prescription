import { Request, Response } from 'express';

import ListAllPatientService from '../../services/patient/ListAllPatientService';

class ListAllPatientController {
  async handle(req: Request, res: Response) {
    const listPatientService = new ListAllPatientService();

    const patients = await listPatientService.execute();

    return res.json(patients);
  }
}

export default new ListAllPatientController();

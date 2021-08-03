import { Request, Response } from 'express';

import ListPatientService from '../../services/patient/ListPatientService';

class ListPatientController {
  async handle(req: Request, res: Response) {
    const listPatientService = new ListPatientService();

    const patients = await listPatientService.execute();

    return res.json(patients);
  }
}

export default new ListPatientController();

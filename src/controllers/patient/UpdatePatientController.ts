import { Request, Response } from 'express';

import UpdatePatientService from '../../services/patient/UpdatePatientService';

class PatientController {
  async handle(req: Request, res: Response) {
    const updatePatientService = new UpdatePatientService();

    const patient = await updatePatientService.execute(req.body);

    if (!patient) return res.status(401).json(null);

    return res.status(200).json({ message: 'Patient updated succefully!' });
  }
}

export default new PatientController();

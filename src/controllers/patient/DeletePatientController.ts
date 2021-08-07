import { Request, Response } from 'express';

import DeletePatientService from '../../services/patient/DeletePatientService';

class DeletePatientController {
  async handle(req: Request, res: Response) {
    const { cpf } = req.params;

    const deletePatientService = new DeletePatientService();

    await deletePatientService.execute(cpf);

    return res.status(200).json({ message: 'Patient removed' });
  }
}

export default new DeletePatientController();

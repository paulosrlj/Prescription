import { Request, Response } from 'express';

import DeletePatientService from '../../services/patient/DeletePatientService';
import SQLitePatientRepository from '../../repositories/implementations/SQLitePatientRepository';

class DeletePatientController {
  async handle(req: Request, res: Response) {
    const cpf = req.patient_cpf;

    const deletePatientService = new DeletePatientService(
      new SQLitePatientRepository(),
    );

    await deletePatientService.execute(cpf);

    return res.status(200).json({ message: 'Patient removed' });
  }
}

export default new DeletePatientController();

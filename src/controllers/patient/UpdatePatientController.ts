import { Request, Response } from 'express';

import UpdatePatientService from '../../services/patient/UpdatePatientService';

import IPatientRequest from '../../dto/IPatientRequest';

class PatientController {
  async handle(req: Request, res: Response) {
    const updatePatientService = new UpdatePatientService();

    const { birthDate, password, phone, email, name } =
      req.body as IPatientRequest;
    const cpf = req.patient_cpf;

    await updatePatientService.execute({
      cpf,
      birthDate,
      password,
      phone,
      email,
      name,
    });

    return res.status(200).json({ message: 'Patient updated succefully!' });
  }
}

export default new PatientController();

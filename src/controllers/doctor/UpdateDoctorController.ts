import { Request, Response } from 'express';
import IDoctor from '../../dto/IDoctorRequest';

import UpdateDoctorService from '../../services/doctor/UpdateDoctorService';

class UpdateDoctorController {
  async handle(req: Request, res: Response) {
    const updateDoctortService = new UpdateDoctorService();

    const { birthDate, password, phone, email, name } = req.body as IDoctor;
    const crm = req.doctor_crm;

    const doctor = await updateDoctortService.execute(crm, {
      birthDate,
      password,
      phone,
      email,
      name,
    });

    if (!doctor) return res.status(401).json(null);

    return res.status(200).json({ message: 'Doctor updated succefully!' });
  }
}

export default new UpdateDoctorController();
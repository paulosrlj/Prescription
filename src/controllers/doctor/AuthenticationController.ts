import { Request, Response } from 'express';
import AuthenticationService from '../../services/doctor/AuthenticationService';
import IDoctorAuthenticationRequest from '../../dto/IDoctorAuthenticationRequest';
import SQLiteDoctorRepository from '../../repositories/implementations/SQLiteDoctorRepository';

class AuthenticationController {
  async handle(req: Request, res: Response) {
    const { crm, password } = req.body as IDoctorAuthenticationRequest;

    const authenticationService = new AuthenticationService(
      new SQLiteDoctorRepository(),
    );

    const token = await authenticationService.execute({ crm, password });

    return res.status(201).json(token);
  }
}

export default new AuthenticationController();

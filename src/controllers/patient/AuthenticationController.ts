import { Request, Response } from 'express';
import AuthenticationService from '../../services/patient/AuthenticationService';
import IPatientAuthenticationRequest from '../../dto/IPatientAuthenticationRequest';

class AuthenticationController {
  async handle(req: Request, res: Response) {
    const { cpf, password } = req.body as IPatientAuthenticationRequest;

    const authenticationService = new AuthenticationService();

    const token = await authenticationService.execute({ cpf, password });

    return res.status(201).json(token);
  }
}

export default new AuthenticationController();

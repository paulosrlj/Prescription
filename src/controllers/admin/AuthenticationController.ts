import { Request, Response } from 'express';
import AuthenticationService from '../../services/admin/AuthenticationService';
import IAdminRequest from '../../dto/IAdminRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';
import SQLiteAdminRepository from '../../repositories/implementations/SQLiteAdminRepository';

class AuthenticationController {
  async handle(req: Request, res: Response) {
    const { email, password, admin_secret } = req.body as IAdminRequest;

    if (!(admin_secret === process.env.ADMIN_SECRET))
      throw new ApplicationErrors('Admin secret invalid', 401);

    const authenticationService = new AuthenticationService(
      new SQLiteAdminRepository(),
    );

    const token = await authenticationService.execute({ email, password });

    return res.status(201).json(token);
  }
}

export default new AuthenticationController();

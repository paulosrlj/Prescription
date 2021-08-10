import { Request, Response } from 'express';

import IAdminRequest from '../../dto/IAdminRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';
import CreateAdminService from '../../services/admin/CreateAdminService';

class CreateAdminController {
  async handle(req: Request, res: Response) {
    const { email, password, admin_secret } =
      req.body as unknown as IAdminRequest;

    if (!(admin_secret === process.env.ADMIN_SECRET))
      throw new ApplicationErrors('Admin secret invalid', 401);

    const createAdminService = new CreateAdminService();
    const admin = await createAdminService.execute({
      email,
      password,
    });

    return res.status(200).json(admin);
  }
}

export default new CreateAdminController();

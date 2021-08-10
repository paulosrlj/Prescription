import { Request, Response } from 'express';

import DeleteAdminService from '../../services/admin/DeleteAdminPatientService';
import IAdminRequest from '../../dto/IAdminRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';

class DeleteAdminController {
  async handle(req: Request, res: Response) {
    const { email, admin_secret } = req.body as IAdminRequest;

    if (!(admin_secret === process.env.ADMIN_SECRET))
      throw new ApplicationErrors('Admin secret invalid', 401);

    const deleteAdminService = new DeleteAdminService();

    await deleteAdminService.execute(email);

    return res.status(200).json({ message: 'Admin removed' });
  }
}

export default new DeleteAdminController();

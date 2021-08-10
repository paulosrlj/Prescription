import { getCustomRepository } from 'typeorm';
import ApplicationErrors from '../../errors/ApplicationErrors';

import AdminRepository from '../../repositories/implementations/AdminRepository';

class DeleteAdminService {
  async execute(email: string): Promise<void> {
    const adminRepository = getCustomRepository(AdminRepository);

    const admin = await adminRepository.findByEmail(email);
    if (!admin) throw new ApplicationErrors('Admin does not exists', 401);

    await adminRepository.deleteByEmail(email);
  }
}

export default DeleteAdminService;

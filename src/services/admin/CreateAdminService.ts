import { getCustomRepository } from 'typeorm';

import IAdminRequest from '../../dto/IAdminRequest';
import { AdminCreateValidation } from '../../utils/AdminValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import AdminRepository from '../../repositories/implementations/AdminRepository';
import Admin from '../../entities/Admin';

class CreateAdminService {
  async execute(adminParams: IAdminRequest): Promise<Admin | null> {
    const adminRepository = getCustomRepository(AdminRepository);

    // Validar os campos
    await AdminCreateValidation(adminParams);

    const adminExists = await adminRepository.findByEmail(adminParams.email);
    if (adminExists) throw new ApplicationErrors('Admin already exists', 401);

    const admin = await adminRepository.createAdmin(adminParams);

    return admin;
  }
}

export default CreateAdminService;

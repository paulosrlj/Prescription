import { getCustomRepository, ObjectType } from 'typeorm';

import IAdminRequest from '../../dto/IAdminRequest';
import { AdminCreateValidation } from '../../utils/AdminValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import Admin from '../../entities/Admin';
import { IAdminRepository } from '../../repositories/IAdminRepository';

class CreateAdminService {
  AdminRepository: IAdminRepository;

  constructor(AdminRepository: IAdminRepository) {
    this.AdminRepository = AdminRepository;
  }

  async execute(adminParams: IAdminRequest): Promise<Admin | null> {
    const adminRepository = getCustomRepository(
      this.AdminRepository as unknown as ObjectType<IAdminRepository>,
    );

    // Validar os campos
    await AdminCreateValidation(adminParams);

    const adminExists = await adminRepository.findByEmail(adminParams.email);
    if (adminExists) throw new ApplicationErrors('Admin already exists', 401);

    const admin = await adminRepository.createAdmin(adminParams);

    return admin;
  }
}

export default CreateAdminService;

import { getCustomRepository, ObjectType } from 'typeorm';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IAdminRepository } from '../../repositories/IAdminRepository';

class DeleteAdminService {
  AdminRepository: IAdminRepository;

  constructor(AdminRepository: IAdminRepository) {
    this.AdminRepository = AdminRepository;
  }

  async execute(email: string): Promise<void> {
    const adminRepository = getCustomRepository(
      this.AdminRepository as unknown as ObjectType<IAdminRepository>,
    );

    const admin = await adminRepository.findByEmail(email);
    if (!admin) throw new ApplicationErrors('Admin does not exists', 401);

    await adminRepository.deleteByEmail(email);
  }
}

export default DeleteAdminService;

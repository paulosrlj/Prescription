import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Admin from '../../entities/Admin';

import IAdminRequest from '../../dto/IAdminRequest';
import { IAdminRepository } from '../IAdminRepository';

@EntityRepository(Admin)
class SQLiteAdminRepository
  extends Repository<Admin>
  implements IAdminRepository
{
  async createAdmin({ email, password }: IAdminRequest): Promise<Admin> {
    const admin = this.create({
      email,
      password,
    });

    await this.save(admin);
    return admin;
  }

  async findByEmail(email: string): Promise<Admin | undefined> {
    const admin = await this.findOne({ email });
    return admin;
  }

  async deleteByEmail(email: string): Promise<DeleteResult> {
    return this.delete({ email });
  }
}

export default SQLiteAdminRepository;

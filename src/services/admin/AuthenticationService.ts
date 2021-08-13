import { getCustomRepository, ObjectType } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import IAdminRequest from '../../dto/IAdminRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IAdminRepository } from '../../repositories/IAdminRepository';

class AuthenticationService {
  AdminRepository: IAdminRepository;

  constructor(AdminRepository: IAdminRepository) {
    this.AdminRepository = AdminRepository;
  }

  async execute({ email, password }: IAdminRequest): Promise<string> {
    const adminRepository = getCustomRepository(
      this.AdminRepository as unknown as ObjectType<IAdminRepository>,
    );

    const admin = await adminRepository.findByEmail(email);
    if (!admin) {
      throw new ApplicationErrors('E-mail or password invalid', 400);
    }

    const passwordCompared = await compare(password, admin.password);
    if (!passwordCompared) {
      throw new ApplicationErrors('E-mail or password invalid', 400);
    }

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        admin_secret: process.env.ADMIN_SECRET,
      },
      tokenKey,
      {
        expiresIn: '7d',
      },
    );

    return token;
  }
}

export default AuthenticationService;

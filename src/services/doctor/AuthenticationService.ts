import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import DoctorRepository from '../../repositories/DoctorRepository';

import IDoctorAuthenticationRequest from '../../dto/IDoctorAuthenticationRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';

class AuthenticationService {
  async execute({
    crm,
    password,
  }: IDoctorAuthenticationRequest): Promise<string> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const doctor = await doctorRepository.findByCrm(crm);
    if (!doctor) {
      throw new ApplicationErrors('E-mail or password invalid', 400);
    }

    const passwordCompared = await compare(password, doctor.password);
    if (!passwordCompared) {
      throw new ApplicationErrors('E-mail or password invalid', 400);
    }

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        cpf: doctor.crm,
      },
      tokenKey,
      {
        expiresIn: '1h',
        subject: doctor.id,
      },
    );

    return token;
  }
}

export default AuthenticationService;

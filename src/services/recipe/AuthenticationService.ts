import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import IPatientAuthenticationRequest from '../../dto/IDoctorAuthenticationRequest';
import AplicationErrors from '../../errors/ApplicationErrors';
import DoctorRepository from '../../repositories/implementations/DoctorRepository';

class AuthenticationService {
  async execute({
    crm,
    password,
  }: IPatientAuthenticationRequest): Promise<string> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const doctor = await doctorRepository.findByCrm(crm);
    if (!doctor) {
      throw new AplicationErrors('CRM or password invalid', 400);
    }

    const passwordCompared = await compare(password, doctor.password);
    if (!passwordCompared) {
      throw new AplicationErrors('CRM or password invalid', 400);
    }

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        cpf: doctor.crm,
      },
      tokenKey,
      {
        expiresIn: '7d',
        subject: doctor.id,
      },
    );

    return token;
  }
}

export default AuthenticationService;

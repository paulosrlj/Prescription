import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import PatientRepository from '../../repositories/PatientRepository';

import IPatientAuthenticationRequest from '../../dto/IPatientAuthenticationRequest';
import AplicationErrors from '../../errors/AplicationErrors';

class AuthenticationService {
  async execute({
    cpf,
    password,
  }: IPatientAuthenticationRequest): Promise<string> {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository.findByCpf(cpf);
    if (!patient) {
      throw new AplicationErrors('E-mail or password invalid', 400);
    }

    const passwordCompared = await compare(password, patient.password);
    if (!passwordCompared) {
      throw new AplicationErrors('E-mail or password invalid', 400);
    }

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        cpf: patient.cpf,
      },
      tokenKey,
      {
        expiresIn: '1h',
        subject: patient.id,
      },
    );

    return token;
  }
}

export default AuthenticationService;
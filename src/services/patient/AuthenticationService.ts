import { getCustomRepository, ObjectType } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import IPatientAuthenticationRequest from '../../dto/IPatientAuthenticationRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IPatientRepository } from '../../repositories/IPatientRepository';

class AuthenticationService {
  PatientRepository: IPatientRepository;

  constructor(PatientRepository: IPatientRepository) {
    this.PatientRepository = PatientRepository;
  }

  async execute({
    cpf,
    password,
  }: IPatientAuthenticationRequest): Promise<string> {
    const patientRepository = getCustomRepository(
      this.PatientRepository as unknown as ObjectType<IPatientRepository>,
    );

    const patient = await patientRepository.findByCpf(cpf);
    if (!patient) {
      throw new ApplicationErrors('E-mail or password invalid', 400);
    }

    const passwordCompared = await compare(password, patient.password);
    if (!passwordCompared) {
      throw new ApplicationErrors('E-mail or password invalid', 400);
    }

    const tokenKey = process.env.TOKEN_KEY || '';
    const token = sign(
      {
        cpf: patient.cpf,
      },
      tokenKey,
      {
        expiresIn: '7d',
        subject: patient.id,
      },
    );

    return token;
  }
}

export default AuthenticationService;

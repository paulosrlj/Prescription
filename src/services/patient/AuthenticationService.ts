import { getCustomRepository, ObjectType } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import IPatientAuthenticationRequest from '../../dto/IPatientAuthenticationRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IPatientRepository } from '../../repositories/IPatientRepository';

interface ResponseType {
  cpf: string;
  name: string;
  email: string;
  birth_date: Date;
  phone: string;
  token: string;
  card_id: string;
}

class AuthenticationService {
  PatientRepository: IPatientRepository;

  constructor(PatientRepository: IPatientRepository) {
    this.PatientRepository = PatientRepository;
  }

  async execute({
    cpf,
    password,
  }: IPatientAuthenticationRequest): Promise<ResponseType> {
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

    return {
      cpf: patient.cpf,
      name: patient.name,
      birth_date: patient.birth_date,
      card_id: patient.card.id,
      email: patient.email,
      phone: patient.phone,
      token,
    };
  }
}

export default AuthenticationService;

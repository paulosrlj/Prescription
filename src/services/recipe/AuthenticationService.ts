import { getCustomRepository, ObjectType } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import IPatientAuthenticationRequest from '../../dto/IDoctorAuthenticationRequest';
import AplicationErrors from '../../errors/ApplicationErrors';
import { IDoctorRepository } from '../../repositories/IDoctorRepository';

class AuthenticationService {
  DoctorRepository: IDoctorRepository;

  constructor(DoctorRepository: IDoctorRepository) {
    this.DoctorRepository = DoctorRepository;
  }

  async execute({
    crm,
    password,
  }: IPatientAuthenticationRequest): Promise<string> {
    const doctorRepository = getCustomRepository(
      this.DoctorRepository as unknown as ObjectType<IDoctorRepository>,
    );
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

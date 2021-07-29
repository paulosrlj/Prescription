import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import PatientRepository from '../repositories/PatientRepository';
import Patient from '../entities/Patient';
import IPatientRequest from '../dto/IPatientRequest';

class PatientService {
  async execute({
    cpf,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IPatientRequest): Promise<Patient> {
    const patientRepository = getCustomRepository(PatientRepository);

    const encryptedPassword = await hash(password, 8);

    const patient = await patientRepository.createPatient({
      cpf,
      name,
      email,
      password: encryptedPassword,
      phone,
      birthDate,
    });

    return patient;
  }
}

export default PatientService;

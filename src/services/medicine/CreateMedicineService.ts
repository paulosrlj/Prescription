import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import { ValidationError } from 'class-validator';
import PatientRepository from '../../repositories/PatientRepository';
import Patient from '../../entities/Patient';
import IPatientRequest from '../../dto/IPatientRequest';

class CreatePatientService {
  async execute({
    cpf,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IPatientRequest): Promise<Patient | ValidationError[]> {
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

export default CreatePatientService;

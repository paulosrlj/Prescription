import { getCustomRepository } from 'typeorm';
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
  }: IPatientRequest): Promise<Patient | null> {
    const patientRepository = getCustomRepository(PatientRepository);
    const patient = await patientRepository.createPatient({
      cpf,
      name,
      email,
      password,
      phone,
      birthDate,
    });

    return patient;
  }
}

export default CreatePatientService;

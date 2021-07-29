import { EntityRepository, Repository } from 'typeorm';
import Patient from '../entities/Patient';

import IPatient from '../dto/IPatientRequest';

@EntityRepository(Patient)
class PatientRepository extends Repository<Patient> {
  async createPatient({
    cpf,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IPatient): Promise<Patient> {
    const patient = this.create({
      cpf,
      email,
      name,
      password,
      phone,
      birthDate,
    });

    await this.save(patient);

    return patient;
  }
}

export default PatientRepository;

import { EntityRepository, Repository, DeleteResult } from 'typeorm';
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

  async findAll(): Promise<Patient[]> {
    return this.find({
      select: ['id', 'name', 'email', 'cpf', 'birthDate', 'phone'],
      relations: ['card'],
    });
  }

  async findByCpf(cpf: string): Promise<Patient | undefined> {
    const patient = await this.findOne({ cpf });
    return patient;
  }

  async findByEmail(email: string): Promise<Patient | undefined> {
    const patient = await this.findOne({ email });
    return patient;
  }
}

export default PatientRepository;

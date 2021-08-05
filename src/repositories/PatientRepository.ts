import { EntityRepository, Repository } from 'typeorm';
import { validate, ValidationError } from 'class-validator';
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
  }: IPatient): Promise<Patient | ValidationError[]> {
    const patient = this.create({
      cpf,
      email,
      name,
      password,
      phone,
      birthDate,
    });

    const errors = await validate(patient);

    console.log(errors);

    if (errors.length > 0) return errors;

    await this.save(patient);

    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return this.find({
      select: ['id', 'name', 'email', 'cpf', 'birthDate', 'phone'],
      relations: ['card'],
    });
  }
}

export default PatientRepository;

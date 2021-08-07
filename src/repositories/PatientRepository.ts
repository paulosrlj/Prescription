import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import { validate, ValidationError } from 'class-validator';
import Patient from '../entities/Patient';

import IPatient from '../dto/IPatientRequest';
import CardRepository from './CardRepository';

@EntityRepository(Patient)
class PatientRepository extends Repository<Patient> {
  async createPatient({
    cpf,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IPatient): Promise<Patient | null> {
    const patientExists = await this.findByCpf(cpf);

    if (patientExists) return null;

    const patient = this.create({
      cpf,
      email,
      name,
      password,
      phone,
      birthDate,
    });

    const cardRepository = getCustomRepository(CardRepository);
    const card = await cardRepository.createCard();

    patient.card = card;

    // const errors = await validate(patient);

    // console.log(errors);

    // if (errors.length > 0) return errors;

    await this.save(patient);

    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return this.find({
      select: ['id', 'name', 'email', 'cpf', 'birthDate', 'phone'],
      relations: ['card'],
    });
  }

  async findByCpf(cpf: string): Promise<Patient | null> {
    const patient = await this.findOne({ cpf });
    if (!patient) return null;

    return patient;
  }

  async findByEmail(email: string): Promise<Patient | null> {
    const patient = await this.findOne({ email });
    if (!patient) return null;

    return patient;
  }

  async deleteByCpf(cpf: string): Promise<DeleteResult> {
    return this.delete({ cpf });
  }
}

export default PatientRepository;

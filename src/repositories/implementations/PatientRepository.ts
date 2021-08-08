import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import Patient from '../../entities/Patient';

import IPatient from '../../dto/IPatientRequest';
import CardRepository from './CardRepository';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IPatientRepository } from '../PatientRepository';

@EntityRepository(Patient)
class PatientRepository
  extends Repository<Patient>
  implements IPatientRepository
{
  async createPatient({
    cpf,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IPatient): Promise<Patient> {
    if (!cpf || !email) throw new ApplicationErrors('Cpf not provided', 400);

    const patientCpfExists = await this.findByCpf(cpf);
    if (patientCpfExists)
      throw new ApplicationErrors('Patient already exists', 401);

    const patientEmailExists = await this.findByEmail(email);
    if (patientEmailExists)
      throw new ApplicationErrors('Email already exists', 401);

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

  async updateByCpf(patientsCriteria: IPatient): Promise<Patient> {
    if (!patientsCriteria.cpf)
      throw new ApplicationErrors('CPF not provided!', 400);

    const { cpf } = patientsCriteria;
    const attributes = { ...patientsCriteria };
    delete attributes.cpf;

    const patient = await this.findByCpf(cpf);

    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);

    await this.update({ cpf }, attributes);

    return patient;
  }

  async deleteByCpf(cpf: string): Promise<DeleteResult> {
    const patient = await this.findByCpf(cpf);
    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);

    return this.delete({ cpf });
  }
}

export default PatientRepository;

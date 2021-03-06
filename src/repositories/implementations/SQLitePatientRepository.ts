import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import Patient from '../../entities/Patient';

import IPatient from '../../dto/IPatientRequest';
import SQLiteCardRepository from './SQLiteCardRepository';
import { IPatientRepository } from '../IPatientRepository';

@EntityRepository(Patient)
class SQLitePatientRepository
  extends Repository<Patient>
  implements IPatientRepository
{
  async createPatient({
    cpf,
    name,
    email,
    password,
    phone,
    birth_date,
  }: IPatient): Promise<Patient> {
    const patient = this.create({
      cpf,
      email,
      name,
      password,
      phone,
      birth_date,
    });

    const cardRepository = getCustomRepository(SQLiteCardRepository);
    const card = await cardRepository.createCard();

    patient.card = card;

    await this.save(patient);

    return patient;
  }

  async findAll(): Promise<Patient[]> {
    return this.find({
      select: ['id', 'name', 'email', 'cpf', 'birth_date', 'phone'],
      relations: ['card'],
    });
  }

  async findByCpf(cpf: string): Promise<Patient | undefined> {
    const patient = await this.findOne({ cpf }, { relations: ['card'] });
    return patient;
  }

  async findByEmail(email: string): Promise<Patient | undefined> {
    const patient = await this.findOne({ email });

    return patient;
  }

  async updateByCpf(patientParams: IPatient): Promise<void> {
    const attributes = { ...patientParams };

    Object.keys(attributes).map(
      key => attributes[key] === undefined && delete attributes[key],
    );

    const { cpf } = attributes;

    await this.update({ cpf }, attributes);
  }

  async deleteByCpf(cpf: string): Promise<DeleteResult> {
    const {
      card: { id },
    } = await this.findByCpf(cpf);
    const cardRepository = getCustomRepository(SQLiteCardRepository);
    const card = await cardRepository.findById(id);

    await cardRepository.deleteById(card.id);

    return this.delete({ cpf });
  }
}

export default SQLitePatientRepository;

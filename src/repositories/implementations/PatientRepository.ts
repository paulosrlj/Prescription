import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';
import Patient from '../../entities/Patient';

import IPatient from '../../dto/IPatientRequest';
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
  }: IPatient): Promise<Patient> {
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

  async updateByCpf(patientParams: IPatient): Promise<void> {
    const attributes = { ...patientParams };

    Object.keys(attributes).map(
      key => attributes[key] === undefined && delete attributes[key],
    );

    const { cpf } = attributes;

    await this.update({ cpf }, attributes);
  }

  async deleteByCpf(cpf: string): Promise<DeleteResult> {
    return this.delete({ cpf });
  }
}

export default PatientRepository;

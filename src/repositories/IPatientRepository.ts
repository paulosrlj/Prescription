import { DeleteResult } from 'typeorm';
import IPatient from '../dto/IPatientRequest';
import Patient from '../entities/Patient';

export interface IPatientRepository {
  createPatient({
    cpf,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IPatient): Promise<Patient>;
  findAll(): Promise<Patient[]>;
  findByCpf(cpf: string): Promise<Patient | undefined>;
  findByEmail(email: string): Promise<Patient | undefined>;
  updateByCpf(patientsCriteria: IPatient): Promise<Patient>;
  deleteByCpf(cpf: string): Promise<DeleteResult>;
}

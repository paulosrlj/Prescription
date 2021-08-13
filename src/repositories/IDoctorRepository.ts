import { DeleteResult } from 'typeorm';
import IDoctor from '../dto/IDoctorRequest';
import Doctor from '../entities/Doctor';

export interface IDoctorRepository {
  createDoctor({
    crm,
    name,
    email,
    password,
    phone,
    birth_date,
  }: IDoctor): Promise<Doctor>;
  findByCrm(cpf: string): Promise<Doctor | undefined>;
  findByEmail(email: string): Promise<Doctor | undefined>;
  updateByCrm(patientsCriteria: IDoctor): Promise<void>;
  deleteByCrm(cpf: string): Promise<DeleteResult>;
}

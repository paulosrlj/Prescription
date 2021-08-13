import { DeleteResult } from 'typeorm';
import IMedicine from '../dto/IMedicineRequest';
import Medicine from '../entities/Medicine';

export interface IMedicineRepository {
  createMedicine({
    categoria,
    classe_terapeutica,
    dosagem,
    empresa_detentora,
    idRegister,
    nome,
  }: IMedicine): Promise<Medicine>;
  findAll(): Promise<Medicine[]>;
  findByNome(nome: string): Promise<Medicine | undefined>;
  findByIdRegister(idRegister: string): Promise<Medicine | undefined>;
  updateByIdRegister(medicineParams: IMedicine): Promise<void>;
  deleteById(idRegister: string): Promise<DeleteResult>;
  deleteByIdRegister(idRegister: string): Promise<DeleteResult>;
}

import { DeleteResult } from 'typeorm';
import IAdminRequest from '../dto/IAdminRequest';
import Admin from '../entities/Admin';

export interface IAdminRepository {
  createAdmin({ email, password, admin_secret }: IAdminRequest): Promise<Admin>;
  findByEmail(email: string): Promise<Admin | undefined>;
  deleteByEmail(email: string): Promise<DeleteResult>;
}

import { EntityRepository, Repository } from 'typeorm';
import Doctor from '../entities/Doctor';

import IDoctor from '../dto/IDoctorRequest';

@EntityRepository(Doctor)
class DoctorRepository extends Repository<Doctor> {
  async createDoctor({
    crm,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IDoctor): Promise<Doctor> {
    const doctor = this.create({
      crm,
      email,
      name,
      password,
      phone,
      birthDate,
    });

    await this.save(doctor);

    return doctor;
  }

  async findAll(): Promise<Doctor[]> {
    return this.find({
      select: ['id', 'name', 'email', 'crm', 'birthDate', 'phone'],
    });
  }

  async findByCrm(crm: string): Promise<Doctor | undefined> {
    const doctor = await this.findOne({ crm });
    return doctor;
  }

  async findByEmail(email: string): Promise<Doctor | undefined> {
    const doctor = await this.findOne({ email });
    return doctor;
  }
}

export default DoctorRepository;

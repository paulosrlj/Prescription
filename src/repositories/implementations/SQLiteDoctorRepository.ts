import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Doctor from '../../entities/Doctor';

import IDoctor from '../../dto/IDoctorRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IDoctorRepository } from '../IDoctorRepository';

@EntityRepository(Doctor)
class SQLiteDoctorRepository
  extends Repository<Doctor>
  implements IDoctorRepository
{
  async createDoctor({
    crm,
    name,
    email,
    password,
    phone,
    birth_date,
  }: IDoctor): Promise<Doctor> {
    if (!crm || !email) throw new ApplicationErrors('CRM not provided', 400);

    const doctorCrmExists = await this.findByCrm(crm);
    if (doctorCrmExists)
      throw new ApplicationErrors('Doctor already exists', 401);

    const doctorEmailExists = await this.findByEmail(email);
    if (doctorEmailExists)
      throw new ApplicationErrors('Email already exists', 401);

    const doctor = this.create({
      crm,
      email,
      name,
      password,
      phone,
      birth_date,
    });

    await this.save(doctor);

    return doctor;
  }

  async findByCrm(crm: string): Promise<Doctor | undefined> {
    const doctor = await this.findOne(crm, {
      relations: ['recipes'],
    });
    return doctor;
  }

  async findByEmail(email: string): Promise<Doctor | undefined> {
    const doctor = await this.findOne(email);
    return doctor;
  }

  async updateByCrm(doctorParams: IDoctor): Promise<void> {
    const attributes = { ...doctorParams };

    Object.keys(attributes).map(
      key => attributes[key] === undefined && delete attributes[key],
    );

    const { crm } = attributes;

    await this.update({ crm }, attributes);
  }

  async deleteByCrm(crm: string): Promise<DeleteResult> {
    const doctor = await this.findByCrm(crm);
    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    return this.delete({ crm });
  }
}

export default SQLiteDoctorRepository;

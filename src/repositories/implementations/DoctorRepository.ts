import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Doctor from '../../entities/Doctor';

import IDoctor from '../../dto/IDoctorRequest';
import ApplicationErrors from '../../errors/ApplicationErrors';

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
      birthDate,
    });

    await this.save(doctor);

    return doctor;
  }

  async findByCrm(crm: string): Promise<Doctor | undefined> {
    const doctor = await this.findOne(crm, {
      select: ['id', 'name', 'email', 'phone', 'crm', 'password'],
    });
    return doctor;
  }

  async findByEmail(email: string): Promise<Doctor | undefined> {
    const doctor = await this.findOne(email, {
      select: ['id', 'name', 'email', 'phone', 'crm', 'password'],
    });
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

export default DoctorRepository;

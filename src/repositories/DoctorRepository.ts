import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Doctor from '../entities/Doctor';

import IDoctor from '../dto/IDoctorRequest';
import ApplicationErrors from '../errors/ApplicationErrors';

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

    const doctorCpfExists = await this.findByCrm(crm);
    if (doctorCpfExists)
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

  async updateByCrm(doctorCriteria: IDoctor): Promise<Doctor> {
    if (!doctorCriteria.crm)
      throw new ApplicationErrors('CRM not provided!', 400);

    const { crm } = doctorCriteria;
    const attributes = { ...doctorCriteria };
    delete attributes.crm;

    const doctor = await this.findByCrm(crm);

    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    await this.update({ crm }, attributes);

    return doctor;
  }

  async deleteByCrm(crm: string): Promise<DeleteResult> {
    const doctor = await this.findByCrm(crm);
    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    return this.delete({ crm });
  }
}

export default DoctorRepository;

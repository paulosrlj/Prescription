import { getCustomRepository } from 'typeorm';

import DoctorRepository from '../../repositories/implementations/DoctorRepository';
import Doctor from '../../entities/Doctor';
import IDoctorRequest from '../../dto/IDoctorRequest';

class CreateDoctorService {
  async execute({
    crm,
    name,
    email,
    password,
    phone,
    birthDate,
  }: IDoctorRequest): Promise<Doctor> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const doctor = await doctorRepository.createDoctor({
      crm,
      name,
      email,
      password,
      phone,
      birthDate,
    });

    return doctor;
  }
}

export default CreateDoctorService;

import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import DoctorRepository from '../../repositories/DoctorRepository';
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

    const encryptedPassword = await hash(password, 8);

    const doctor = await doctorRepository.createDoctor({
      crm,
      name,
      email,
      password: encryptedPassword,
      phone,
      birthDate,
    });

    return doctor;
  }
}

export default CreateDoctorService;

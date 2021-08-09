import { getCustomRepository } from 'typeorm';

import IDoctor from '../../dto/IDoctorRequest';
import DoctorRepository from '../../repositories/implementations/DoctorRepository';
import Doctor from '../../entities/Doctor';

class UpdateDoctorService {
  async execute(
    crm: string,
    { name, birthDate, phone, email, password }: IDoctor,
  ): Promise<Doctor | null> {
    const doctorRepository = getCustomRepository(DoctorRepository);
    const doctor = await doctorRepository.updateByCrm(crm, {
      name,
      birthDate,
      phone,
      email,
      password,
    });

    return doctor;
  }
}

export default UpdateDoctorService;

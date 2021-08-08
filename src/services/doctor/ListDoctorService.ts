import { getCustomRepository } from 'typeorm';

import DoctorRepository from '../../repositories/implementations/DoctorRepository';
import Doctor from '../../entities/Doctor';

class ListDoctorService {
  async execute(): Promise<Doctor[]> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const doctors = await doctorRepository.findAll();

    return doctors;
  }
}

export default ListDoctorService;

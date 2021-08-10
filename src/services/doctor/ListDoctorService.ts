import { getCustomRepository } from 'typeorm';

import DoctorRepository from '../../repositories/implementations/DoctorRepository';
import Doctor from '../../entities/Doctor';
import ApplicationErrors from '../../errors/ApplicationErrors';

class ListDoctorService {
  async execute(crm: string): Promise<Doctor> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const doctor = await doctorRepository.findByCrm(crm);

    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    return doctor;
  }
}

export default ListDoctorService;

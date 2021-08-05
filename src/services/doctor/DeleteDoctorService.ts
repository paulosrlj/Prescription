import { DeleteResult, getCustomRepository } from 'typeorm';

import DoctorRepository from '../../repositories/DoctorRepository';
// import Doctor from '../../entities/Doctor';

class DeleteDoctorService {
  async execute(crm: string): Promise<DeleteResult> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const doctor = await doctorRepository.delete({ crm });

    return doctor;
  }
}

export default DeleteDoctorService;

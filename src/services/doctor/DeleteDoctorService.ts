import { DeleteResult, getCustomRepository } from 'typeorm';

import DoctorRepository from '../../repositories/implementations/DoctorRepository';
// import Doctor from '../../entities/Doctor';

class DeleteDoctorService {
  async execute(crm: string): Promise<DeleteResult> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    const doctor = await doctorRepository.deleteByCrm(crm);

    return doctor;
  }
}

export default DeleteDoctorService;

import { getCustomRepository, ObjectType } from 'typeorm';
import Doctor from '../../entities/Doctor';

import ApplicationErrors from '../../errors/ApplicationErrors';
import { IDoctorRepository } from '../../repositories/IDoctorRepository';

class ListDoctorService {
  DoctorRepository: IDoctorRepository;

  constructor(DoctorRepository: IDoctorRepository) {
    this.DoctorRepository = DoctorRepository;
  }

  async execute(crm: string): Promise<Doctor> {
    const doctorRepository = getCustomRepository(
      this.DoctorRepository as unknown as ObjectType<IDoctorRepository>,
    );
    const doctor = await doctorRepository.findByCrm(crm);

    if (!doctor) throw new ApplicationErrors('Doctor does not exists', 401);

    return doctor;
  }
}

export default ListDoctorService;

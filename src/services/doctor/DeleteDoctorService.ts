import { DeleteResult, getCustomRepository, ObjectType } from 'typeorm';
import { IDoctorRepository } from '../../repositories/IDoctorRepository';

class DeleteDoctorService {
  DoctorRepository: IDoctorRepository;

  constructor(DoctorRepository: IDoctorRepository) {
    this.DoctorRepository = DoctorRepository;
  }

  async execute(crm: string): Promise<DeleteResult> {
    const doctorRepository = getCustomRepository(
      this.DoctorRepository as unknown as ObjectType<IDoctorRepository>,
    );

    const doctor = await doctorRepository.deleteByCrm(crm);

    return doctor;
  }
}

export default DeleteDoctorService;

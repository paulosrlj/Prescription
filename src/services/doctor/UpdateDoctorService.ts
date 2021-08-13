import { getCustomRepository, ObjectType } from 'typeorm';

import IDoctor from '../../dto/IDoctorRequest';
import { doctorUpdateValidation } from '../../utils/doctorValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IDoctorRepository } from '../../repositories/IDoctorRepository';

class UpdateDoctorService {
  DoctorRepository: IDoctorRepository;

  constructor(DoctorRepository: IDoctorRepository) {
    this.DoctorRepository = DoctorRepository;
  }

  async execute(doctorParams: IDoctor): Promise<void> {
    const doctorRepository = getCustomRepository(
      this.DoctorRepository as unknown as ObjectType<IDoctorRepository>,
    );

    await doctorUpdateValidation(doctorParams);

    const doctorExists = await doctorRepository.findByCrm(doctorParams.crm);
    if (!doctorExists)
      throw new ApplicationErrors('Patient does not exists', 401);

    await doctorRepository.updateByCrm(doctorParams);
  }
}

export default UpdateDoctorService;

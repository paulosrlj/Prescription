import { getCustomRepository } from 'typeorm';

import IDoctor from '../../dto/IDoctorRequest';
import DoctorRepository from '../../repositories/implementations/DoctorRepository';
import { doctorUpdateValidation } from '../../utils/doctorValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';

class UpdateDoctorService {
  async execute(doctorParams: IDoctor): Promise<void> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    await doctorUpdateValidation(doctorParams);

    const doctorExists = await doctorRepository.findByCrm(doctorParams.crm);
    if (!doctorExists)
      throw new ApplicationErrors('Patient does not exists', 401);

    await doctorRepository.updateByCrm(doctorParams);
  }
}

export default UpdateDoctorService;

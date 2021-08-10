import { getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/implementations/PatientRepository';
import IPatientRequest from '../../dto/IPatientRequest';
import { patientUpdateValidation } from '../../utils/patientValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';

class UpdatePatientService {
  async execute(patientParams: IPatientRequest): Promise<void> {
    const patientRepository = getCustomRepository(PatientRepository);

    await patientUpdateValidation(patientParams);

    const patientExists = await patientRepository.findByCpf(patientParams.cpf);
    if (!patientExists)
      throw new ApplicationErrors('Patient does not exists', 401);

    await patientRepository.updateByCpf(patientParams);
  }
}

export default UpdatePatientService;

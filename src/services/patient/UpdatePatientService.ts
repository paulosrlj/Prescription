import { getCustomRepository, ObjectType } from 'typeorm';

import IPatientRequest from '../../dto/IPatientRequest';
import { patientUpdateValidation } from '../../utils/patientValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IPatientRepository } from '../../repositories/IPatientRepository';

class UpdatePatientService {
  PatientRepository: IPatientRepository;

  constructor(PatientRepository: IPatientRepository) {
    this.PatientRepository = PatientRepository;
  }

  async execute(patientParams: IPatientRequest): Promise<void> {
    const patientRepository = getCustomRepository(
      this.PatientRepository as unknown as ObjectType<IPatientRepository>,
    );

    await patientUpdateValidation(patientParams);

    const patientExists = await patientRepository.findByCpf(patientParams.cpf);
    if (!patientExists)
      throw new ApplicationErrors('Patient does not exists', 401);

    await patientRepository.updateByCpf(patientParams);
  }
}

export default UpdatePatientService;

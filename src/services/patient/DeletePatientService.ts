import { getCustomRepository, ObjectType } from 'typeorm';
import ApplicationErrors from '../../errors/ApplicationErrors';

import { IPatientRepository } from '../../repositories/IPatientRepository';

class DeletePatientService {
  PatientRepository: IPatientRepository;

  constructor(PatientRepository: IPatientRepository) {
    this.PatientRepository = PatientRepository;
  }

  async execute(cpf: string): Promise<void> {
    const patientRepository = getCustomRepository(
      this.PatientRepository as unknown as ObjectType<IPatientRepository>,
    );

    const patient = await patientRepository.findByCpf(cpf);
    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);

    await patientRepository.deleteByCpf(cpf);
  }
}

export default DeletePatientService;

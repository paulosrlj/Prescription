import { getCustomRepository, ObjectType } from 'typeorm';

import Patient from '../../entities/Patient';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IPatientRepository } from '../../repositories/IPatientRepository';

class ListPatientService {
  PatientRepository: IPatientRepository;

  constructor(PatientRepository: IPatientRepository) {
    this.PatientRepository = PatientRepository;
  }

  async execute(cpf: string): Promise<Patient> {
    const patientRepository = getCustomRepository(
      this.PatientRepository as unknown as ObjectType<IPatientRepository>,
    );

    const patient = await patientRepository.findByCpf(cpf);
    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);

    return patient;
  }
}

export default ListPatientService;

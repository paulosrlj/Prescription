import { getCustomRepository, ObjectType } from 'typeorm';

import Patient from '../../entities/Patient';
import { IPatientRepository } from '../../repositories/IPatientRepository';

class ListAllPatientService {
  PatientRepository: IPatientRepository;

  constructor(PatientRepository: IPatientRepository) {
    this.PatientRepository = PatientRepository;
  }

  async execute(): Promise<Patient[]> {
    const patientRepository = getCustomRepository(
      this.PatientRepository as unknown as ObjectType<IPatientRepository>,
    );

    const patients = await patientRepository.findAll();

    return patients;
  }
}

export default ListAllPatientService;

import { getCustomRepository, UpdateResult } from 'typeorm';
import { ValidationError } from 'class-validator';

import PatientRepository from '../../repositories/PatientRepository';
import Patient from '../../entities/Patient';
import IPatientRequest from '../../dto/IPatientRequest';

class UpdatePatientService {
  async execute(patientsCriteria: IPatientRequest): Promise<Patient | null> {
    const patientRepository = getCustomRepository(PatientRepository);
    const patient = await patientRepository.updateByCpf(patientsCriteria);

    return patient;
  }
}

export default UpdatePatientService;

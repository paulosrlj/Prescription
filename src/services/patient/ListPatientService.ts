import { getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/PatientRepository';
import Patient from '../../entities/Patient';

class ListPatientService {
  async execute(): Promise<Patient[]> {
    const patientRepository = getCustomRepository(PatientRepository);

    const patients = await patientRepository.findAll();

    return patients;
  }
}

export default ListPatientService;

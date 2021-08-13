import { getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/implementations/SQLitePatientRepository';
import Patient from '../../entities/Patient';

class ListAllPatientService {
  async execute(): Promise<Patient[]> {
    const patientRepository = getCustomRepository(PatientRepository);

    const patients = await patientRepository.findAll();

    return patients;
  }
}

export default ListAllPatientService;

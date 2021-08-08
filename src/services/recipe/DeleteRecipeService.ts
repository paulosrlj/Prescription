import { DeleteResult, getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/implementations/PatientRepository';
import Patient from '../../entities/Patient';

class DeletePatientService {
  async execute(cpf: string): Promise<DeleteResult> {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository.delete({ cpf });

    return patient;
  }
}

export default DeletePatientService;

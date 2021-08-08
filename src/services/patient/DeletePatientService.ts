import { DeleteResult, getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/implementations/PatientRepository';

class DeletePatientService {
  async execute(cpf: string): Promise<DeleteResult> {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository.deleteByCpf(cpf);

    return patient;
  }
}

export default DeletePatientService;

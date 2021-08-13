import { getCustomRepository } from 'typeorm';
import ApplicationErrors from '../../errors/ApplicationErrors';

import PatientRepository from '../../repositories/implementations/SQLitePatientRepository';

class DeletePatientService {
  async execute(cpf: string): Promise<void> {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository.findByCpf(cpf);
    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);

    await patientRepository.deleteByCpf(cpf);
  }
}

export default DeletePatientService;

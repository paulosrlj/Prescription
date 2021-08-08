import { getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/implementations/PatientRepository';
import Patient from '../../entities/Patient';
import ApplicationErrors from '../../errors/ApplicationErrors';

class ListPatientService {
  async execute(cpf: string): Promise<Patient> {
    const patientRepository = getCustomRepository(PatientRepository);

    const patient = await patientRepository.findByCpf(cpf);
    if (!patient) throw new ApplicationErrors('Patient does not exists', 401);

    return patient;
  }
}

export default ListPatientService;

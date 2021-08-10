import { getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/implementations/PatientRepository';
import Patient from '../../entities/Patient';
import IPatientRequest from '../../dto/IPatientRequest';

class UpdatePatientService {
  async execute(
    cpf: string,
    { birthDate, password, phone, email, name }: IPatientRequest,
  ): Promise<Patient | null> {
    const patientRepository = getCustomRepository(PatientRepository);
    const patient = await patientRepository.updateByCpf(cpf, {
      birthDate,
      password,
      phone,
      email,
      name,
    });

    return patient;
  }
}

export default UpdatePatientService;

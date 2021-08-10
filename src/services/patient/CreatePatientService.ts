import { getCustomRepository } from 'typeorm';

import PatientRepository from '../../repositories/implementations/PatientRepository';
import Patient from '../../entities/Patient';
import IPatientRequest from '../../dto/IPatientRequest';

import { patientCreateValidation } from '../../utils/patientValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';

class CreatePatientService {
  async execute(patientParams: IPatientRequest): Promise<Patient | null> {
    const patientRepository = getCustomRepository(PatientRepository);

    // Validar os campos

    await patientCreateValidation(patientParams);

    // Verificar se o paciente existe
    const patientCpfExists = await patientRepository.findByCpf(
      patientParams.cpf,
    );
    if (patientCpfExists)
      throw new ApplicationErrors('Patient already exists', 401);

    // Verificar se o email já não existe
    const patientEmailExists = await patientRepository.findByEmail(
      patientParams.email,
    );
    if (patientEmailExists)
      throw new ApplicationErrors('Email already exists', 401);

    const patient = await patientRepository.createPatient(patientParams);

    return patient;
  }
}

export default CreatePatientService;

import { getCustomRepository } from 'typeorm';

import DoctorRepository from '../../repositories/implementations/DoctorRepository';
import Doctor from '../../entities/Doctor';
import IDoctorRequest from '../../dto/IDoctorRequest';
import { doctorCreateValidation } from '../../utils/doctorValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';

class CreateDoctorService {
  async execute(doctorParams: IDoctorRequest): Promise<Doctor> {
    const doctorRepository = getCustomRepository(DoctorRepository);

    await doctorCreateValidation(doctorParams);

    // Verificar se o paciente existe
    const doctorCrmExists = await doctorRepository.findByCrm(doctorParams.crm);
    if (doctorCrmExists)
      throw new ApplicationErrors('Doctor already exists', 401);

    // Verificar se o email já não existe
    const doctorEmailExists = await doctorRepository.findByEmail(
      doctorParams.email,
    );
    if (doctorEmailExists)
      throw new ApplicationErrors('Email already exists', 401);

    const doctor = await doctorRepository.createDoctor(doctorParams);

    return doctor;
  }
}

export default CreateDoctorService;

import { getCustomRepository } from 'typeorm';

import MedicineRepository from '../../repositories/implementations/MedicineRepository';
import Medicine from '../../entities/Medicine';
import IMedicine from '../../dto/IMedicineRequest';
import { medicineCreateValidation } from '../../utils/medicineValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';

class CreateMedicineService {
  async execute(medicineParams: IMedicine): Promise<Medicine> {
    const medicineRepository = getCustomRepository(MedicineRepository);

    await medicineCreateValidation(medicineParams);

    const medicineAlreadyExists = await medicineRepository.findByIdRegister(
      medicineParams.idRegister,
    );

    if (medicineAlreadyExists)
      throw new ApplicationErrors('Medicine already exists', 401);

    const medicine = await medicineRepository.createMedicine(medicineParams);

    return medicine;
  }
}

export default CreateMedicineService;

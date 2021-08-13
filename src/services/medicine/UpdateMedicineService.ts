import { getCustomRepository } from 'typeorm';

import MedicineRepository from '../../repositories/implementations/MedicineRepository';
import IMedicineRequest from '../../dto/IMedicineRequest';
import { medicineUpdateValidation } from '../../utils/medicineValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';

class UpdateMedicineService {
  async execute(medicineParams: IMedicineRequest): Promise<void> {
    const medicineRepository = getCustomRepository(MedicineRepository);

    await medicineUpdateValidation(medicineParams);

    const medicineExists = await medicineRepository.findByIdRegister(
      medicineParams.idRegister,
    );
    if (!medicineExists)
      throw new ApplicationErrors('Medicine does not exists', 401);

    await medicineRepository.updateByIdRegister(medicineParams);
  }
}

export default UpdateMedicineService;

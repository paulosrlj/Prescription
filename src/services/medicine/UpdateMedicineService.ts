import { getCustomRepository, ObjectType } from 'typeorm';

import IMedicineRequest from '../../dto/IMedicineRequest';
import { medicineUpdateValidation } from '../../utils/medicineValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IMedicineRepository } from '../../repositories/IMedicineRepository';

class UpdateMedicineService {
  MedicineRepository: IMedicineRepository;

  constructor(MedicineRepository: IMedicineRepository) {
    this.MedicineRepository = MedicineRepository;
  }

  async execute(medicineParams: IMedicineRequest): Promise<void> {
    const medicineRepository = getCustomRepository(
      this.MedicineRepository as unknown as ObjectType<IMedicineRepository>,
    );
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

import { getCustomRepository, ObjectType } from 'typeorm';

import Medicine from '../../entities/Medicine';
import IMedicine from '../../dto/IMedicineRequest';
import { medicineCreateValidation } from '../../utils/medicineValidation';
import ApplicationErrors from '../../errors/ApplicationErrors';
import { IMedicineRepository } from '../../repositories/IMedicineRepository';

class CreateMedicineService {
  MedicineRepository: IMedicineRepository;

  constructor(MedicineRepository: IMedicineRepository) {
    this.MedicineRepository = MedicineRepository;
  }

  async execute(medicineParams: IMedicine): Promise<Medicine> {
    const medicineRepository = getCustomRepository(
      this.MedicineRepository as unknown as ObjectType<IMedicineRepository>,
    );

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

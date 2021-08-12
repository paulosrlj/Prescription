import { getCustomRepository, UpdateResult } from 'typeorm';
import { ValidationError } from 'class-validator';

import MedicineRepository from '../../repositories/MedicineRepository';
import Medicine from '../../entities/Medicine';
import IMedicineRequest from '../../dto/IMedicineRequest';

class UpdateMedicineService {
  async execute(MedicinesCriteria: IMedicineRequest): Promise<Medicine | null> {
    const medicineRepository = getCustomRepository(MedicineRepository);
    const medicine = await medicineRepository.updateByIdRegister(
      MedicinesCriteria,
    );

    return medicine;
  }
}

export default UpdateMedicineService;

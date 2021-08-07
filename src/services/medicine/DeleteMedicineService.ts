import { DeleteResult, getCustomRepository } from 'typeorm';

import MedicineRepository from '../../repositories/MedicineRepository';
import Medicine from '../../entities/Medicine';

class DeleteMedicineService {
  async execute(idRegister: string): Promise<DeleteResult> {
    const medicineRepository = getCustomRepository(MedicineRepository);

    const medicine = await medicineRepository.delete({ idRegister });

    return medicine;
  }
}

export default DeleteMedicineService;

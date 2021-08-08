import { getCustomRepository } from 'typeorm';

import MedicineRepository from '../../repositories/MedicineRepository';
import Medicine from '../../entities/Medicine';

class ListAllMedicineService {
  async execute(): Promise<Medicine[]> {
    const medicineRepository = getCustomRepository(MedicineRepository);

    const medicines = await medicineRepository.findAll();

    return medicines;
  }
}

export default ListAllMedicineService;

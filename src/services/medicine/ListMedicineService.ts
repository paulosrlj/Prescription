import { getCustomRepository } from 'typeorm';

import MedicineRepository from '../../repositories/MedicineRepository';
import Medicine from '../../entities/Medicine';

class ListMedicineService {
  async execute(): Promise<Medicine[]> {
    const medicineRepository = getCustomRepository(MedicineRepository);

    const medicines = await medicineRepository.findAll();

    return medicines;
  }
}

export default ListMedicineService;

import { getCustomRepository, ObjectType } from 'typeorm';

import Medicine from '../../entities/Medicine';
import { IMedicineRepository } from '../../repositories/IMedicineRepository';

class ListAllMedicineService {
  MedicineRepository: IMedicineRepository;

  constructor(MedicineRepository: IMedicineRepository) {
    this.MedicineRepository = MedicineRepository;
  }

  async execute(): Promise<Medicine[]> {
    const medicineRepository = getCustomRepository(
      this.MedicineRepository as unknown as ObjectType<IMedicineRepository>,
    );
    const medicines = await medicineRepository.findAll();

    return medicines;
  }
}

export default ListAllMedicineService;

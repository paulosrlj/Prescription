import { getCustomRepository, ObjectType } from 'typeorm';

import Medicine from '../../entities/Medicine';
import { IMedicineRepository } from '../../repositories/IMedicineRepository';

class FindMedicineByNameService {
  MedicineRepository: IMedicineRepository;

  constructor(MedicineRepository: IMedicineRepository) {
    this.MedicineRepository = MedicineRepository;
  }

  async execute(nome: string): Promise<Medicine> {
    const medicineRepository = getCustomRepository(
      this.MedicineRepository as unknown as ObjectType<IMedicineRepository>,
    );
    const medicine = await medicineRepository.findByNome(nome);

    return medicine;
  }
}

export default FindMedicineByNameService;

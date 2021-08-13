import { getCustomRepository, ObjectType } from 'typeorm';

import ApplicationErrors from '../../errors/ApplicationErrors';
import { IMedicineRepository } from '../../repositories/IMedicineRepository';

class DeleteMedicineService {
  MedicineRepository: IMedicineRepository;

  constructor(MedicineRepository: IMedicineRepository) {
    this.MedicineRepository = MedicineRepository;
  }

  async execute(idRegister: string): Promise<void> {
    const medicineRepository = getCustomRepository(
      this.MedicineRepository as unknown as ObjectType<IMedicineRepository>,
    );

    const medicine = await medicineRepository.findByIdRegister(idRegister);
    if (!medicine) throw new ApplicationErrors('Medicine does not exists', 401);

    await medicineRepository.deleteByIdRegister(idRegister);
  }
}

export default DeleteMedicineService;

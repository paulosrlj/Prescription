import { DeleteResult, getCustomRepository } from 'typeorm';

import MedicineRepository from '../../repositories/implementations/MedicineRepository';
import Medicine from '../../entities/Medicine';
import ApplicationErrors from '../../errors/ApplicationErrors';

class DeleteMedicineService {
  async execute(idRegister: string): Promise<void> {
    const medicineRepository = getCustomRepository(MedicineRepository);

    const medicine = await medicineRepository.findByIdRegister(idRegister);
    if (!medicine) throw new ApplicationErrors('Medicine does not exists', 401);

    await medicineRepository.deleteByIdRegister(idRegister);
  }
}

export default DeleteMedicineService;

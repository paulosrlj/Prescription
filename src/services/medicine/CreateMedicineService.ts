import { getCustomRepository } from 'typeorm';

import MedicineRepository from '../../repositories/implementations/MedicineRepository';
import Medicine from '../../entities/Medicine';
import IMedicine from '../../dto/IMedicineRequest';

class CreateMedicineService {
  async execute({
    idRegister,
    nome,
    categoria,
    classe_terapeutica,
    empresa_detentora,
  }: IMedicine): Promise<Medicine> {
    const medicineRepository = getCustomRepository(MedicineRepository);

    const medicine = await medicineRepository.createMedicine({
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
    });

    return medicine;
  }
}

export default CreateMedicineService;

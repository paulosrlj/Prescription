import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Medicine from '../../entities/Medicine';

import IMedicine from '../../dto/IMedicineRequest';

@EntityRepository(Medicine)
class MedicineRepository extends Repository<Medicine> {
  async createMedicine(medicineParams: IMedicine): Promise<Medicine> {
    const medicine = this.create(medicineParams);

    await this.save(medicine);

    return medicine;
  }

  async findAll(): Promise<Medicine[]> {
    return this.find({
      select: [
        'id',
        'idRegister',
        'nome',
        'categoria',
        'classe_terapeutica',
        'empresa_detentora',
      ],
    });
  }

  async findByNome(nome: string): Promise<Medicine | undefined> {
    const medicine = await this.findOne({ nome });
    return medicine;
  }

  async findByIdRegister(idRegister: string): Promise<Medicine | undefined> {
    const medicine = await this.findOne({ idRegister });
    return medicine;
  }

  async deleteById(idRegister: string): Promise<DeleteResult> {
    const medicine = await this.delete({ idRegister });
    return medicine;
  }
}

export default MedicineRepository;

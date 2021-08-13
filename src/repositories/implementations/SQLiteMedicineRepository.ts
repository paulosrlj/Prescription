import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Medicine from '../../entities/Medicine';

import IMedicine from '../../dto/IMedicineRequest';
import { IMedicineRepository } from '../IMedicineRepository';

@EntityRepository(Medicine)
class SQLiteMedicineRepository
  extends Repository<Medicine>
  implements IMedicineRepository
{
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
        'dosagem',
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

  async updateByIdRegister(medicineParams: IMedicine): Promise<void> {
    const attributes = { ...medicineParams };

    Object.keys(attributes).map(
      key => attributes[key] === undefined && delete attributes[key],
    );

    const { idRegister } = attributes;

    await this.update({ idRegister }, attributes);
  }

  async deleteByIdRegister(idRegister: string): Promise<DeleteResult> {
    return this.delete({ idRegister });
  }
}

export default SQLiteMedicineRepository;

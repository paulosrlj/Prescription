import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Medicine from '../entities/Medicine';

import IMedicine from '../dto/IMedicineRequest';

@EntityRepository(Medicine)
class MedicineRepository extends Repository<Medicine> {
  async createMedicine({
    idRegister,
    nome,
    categoria,
    classe_terapeutica,
    empresa_detentora,
  }: IMedicine): Promise<Medicine> {
    const medicine = this.create({
      idRegister,
      nome,
      categoria,
      classe_terapeutica,
      empresa_detentora,
    });

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

  async findById(id: string): Promise<Medicine | undefined> {
    const medicine = await this.findOne({ id });
    return medicine;
  }

  async deleteById(idRegister: string): Promise<DeleteResult> {
    const medicine = await this.delete({ idRegister });
    return medicine;
  }
}

export default MedicineRepository;

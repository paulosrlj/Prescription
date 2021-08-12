import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import Medicine from '../entities/Medicine';

import IMedicine from '../dto/IMedicineRequest';
import ApplicationErrors from '../errors/ApplicationErrors';

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

  async findByIdRegister(idRegister: string): Promise<Medicine | undefined> {
    const medicine = await this.findOne({ idRegister });
    return medicine;
  }

  async updateByIdRegister(medicinesCriteria: IMedicine): Promise<Medicine> {
    if (!medicinesCriteria.idRegister)
      throw new ApplicationErrors('Id not provided!', 400);

    const { idRegister } = medicinesCriteria;
    const attributes = { ...medicinesCriteria };
    delete attributes.idRegister;

    const patient = await this.findByIdRegister(idRegister);

    if (!patient) throw new ApplicationErrors('Medicine does not exists', 401);

    await this.update({ idRegister }, attributes);

    return patient;
  }

  async deleteByIdRegister(idRegister: string): Promise<DeleteResult> {
    const medicine = await this.findByIdRegister(idRegister);
    if (!medicine) throw new ApplicationErrors('Medicine does not exists', 401);
    return this.delete({ idRegister });
  }
}

export default MedicineRepository;

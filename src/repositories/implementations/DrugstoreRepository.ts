import { EntityRepository, Repository } from 'typeorm';
import Drugstore from '../../entities/Drugstore';

import IDrugstore from '../../dto/IDrugstoreRequest';

@EntityRepository(Drugstore)
class DrugstoreRepository extends Repository<Drugstore> {
  async createDrugstore({ name, lat, lng }: IDrugstore): Promise<Drugstore> {
    const drugstore = this.create({
      name,
      lat,
      lng,
    });

    await this.save(drugstore);

    return drugstore;
  }

  async findAll(): Promise<Drugstore[]> {
    return this.find({
      select: ['id', 'name', 'lat', 'lng'],
    });
  }
}

export default DrugstoreRepository;

import { getCustomRepository, ObjectType } from 'typeorm';

import Drugstore from '../../entities/Drugstore';
import { IDrugstoreRepository } from '../../repositories/IDrugstoreRepository';

class ListDrugstoreService {
  DrugstoreRepository: IDrugstoreRepository;

  constructor(DrugstoreRepository: IDrugstoreRepository) {
    this.DrugstoreRepository = DrugstoreRepository;
  }

  async execute(): Promise<Drugstore[]> {
    const drugstoreRepository = getCustomRepository(
      this.DrugstoreRepository as unknown as ObjectType<IDrugstoreRepository>,
    );

    const drugstores = await drugstoreRepository.findAll();

    return drugstores;
  }
}

export default ListDrugstoreService;

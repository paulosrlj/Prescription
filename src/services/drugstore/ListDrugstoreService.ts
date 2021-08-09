import { getCustomRepository } from 'typeorm';

import DrugstoreRepository from '../../repositories/DrugstoreRepository';
import Drugstore from '../../entities/Drugstore';

class ListDrugstoreService {
  async execute(): Promise<Drugstore[]> {
    const drugstoreRepository = getCustomRepository(DrugstoreRepository);

    const drugstores = await drugstoreRepository.findAll();

    return drugstores;
  }
}

export default ListDrugstoreService;

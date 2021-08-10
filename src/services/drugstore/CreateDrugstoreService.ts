import { getCustomRepository } from 'typeorm';

import DrugstoreRepository from '../../repositories/implementations/DrugstoreRepository';
import Drugstore from '../../entities/Drugstore';
import IDrugstoreRequest from '../../dto/IDrugstoreRequest';

class CreateDrugstoreService {
  async execute({
    name,
    lat,
    lng,
  }: IDrugstoreRequest): Promise<Drugstore | null> {
    const drugstoreRepository = getCustomRepository(DrugstoreRepository);
    const drugstore = await drugstoreRepository.createDrugstore({
      name,
      lat,
      lng,
    });

    return drugstore;
  }
}

export default CreateDrugstoreService;

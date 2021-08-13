import { getCustomRepository, ObjectType } from 'typeorm';

import Drugstore from '../../entities/Drugstore';
import IDrugstoreRequest from '../../dto/IDrugstoreRequest';
import { IDrugstoreRepository } from '../../repositories/IDrugstoreRepository';

class CreateDrugstoreService {
  DrugstoreRepository: IDrugstoreRepository;

  constructor(DrugstoreRepository: IDrugstoreRepository) {
    this.DrugstoreRepository = DrugstoreRepository;
  }

  async execute({
    name,
    lat,
    lng,
  }: IDrugstoreRequest): Promise<Drugstore | null> {
    const drugstoreRepository = getCustomRepository(
      this.DrugstoreRepository as unknown as ObjectType<IDrugstoreRepository>,
    );
    const drugstore = await drugstoreRepository.createDrugstore({
      name,
      lat,
      lng,
    });

    return drugstore;
  }
}

export default CreateDrugstoreService;

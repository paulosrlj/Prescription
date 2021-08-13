import IDrugstore from '../dto/IDrugstoreRequest';

import Drugstore from '../entities/Drugstore';

export interface IDrugstoreRepository {
  createDrugstore({ name, lat, lng }: IDrugstore): Promise<Drugstore>;
  findAll(): Promise<Drugstore[]>;
}

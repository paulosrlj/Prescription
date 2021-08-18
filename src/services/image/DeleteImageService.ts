import { getCustomRepository } from 'typeorm';
import ApplicationErrors from '../../errors/ApplicationErrors';

import SQLImageRepository from '../../repositories/implementations/SQLiteImageRepository';

class DeleteImageService {
  async execute(id: string): Promise<void> {
    const imageRepository = getCustomRepository(SQLImageRepository);

    const image = await imageRepository.findById(id);
    if (!image) throw new ApplicationErrors('Patient does not exists', 401);

    await imageRepository.deleteById(id);
  }
}

export default DeleteImageService;

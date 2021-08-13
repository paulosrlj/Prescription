import { getCustomRepository } from 'typeorm';
import ApplicationErrors from '../../errors/ApplicationErrors';

import ImageRepository from '../../repositories/implementations/ImageRepository';

class DeleteImageService {
  async execute(id: string): Promise<void> {
    const imageRepository = getCustomRepository(ImageRepository);

    const image = await imageRepository.findById(id);
    if (!image) throw new ApplicationErrors('Patient does not exists', 401);

    await imageRepository.deleteById(id);
  }
}

export default DeleteImageService;

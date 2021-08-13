import { getCustomRepository } from 'typeorm';

import Image from '../../entities/Image';
import ImageRepository from '../../repositories/implementations/ImageRepository';
import ApplicationErrors from '../../errors/ApplicationErrors';

class ListImageService {
  async execute(id: string): Promise<Image> {
    const patientRepository = getCustomRepository(ImageRepository);

    const image = await patientRepository.findById(id);
    if (!image) throw new ApplicationErrors('Image does not exists', 401);

    return image;
  }
}

export default ListImageService;

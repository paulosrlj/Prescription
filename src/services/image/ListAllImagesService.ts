import { getCustomRepository } from 'typeorm';

import Image from '../../entities/Image';
import ImageRepository from '../../repositories/implementations/ImageRepository';

class ListAllImagesService {
  async execute(): Promise<Image[]> {
    const imageRepository = getCustomRepository(ImageRepository);

    const images = await imageRepository.findAll();

    return images;
  }
}

export default ListAllImagesService;

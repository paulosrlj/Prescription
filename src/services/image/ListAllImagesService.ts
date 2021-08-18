import { getCustomRepository } from 'typeorm';

import Image from '../../entities/Image';
import SQLImageRepository from '../../repositories/implementations/SQLiteImageRepository';

class ListAllImagesService {
  async execute(): Promise<Image[]> {
    const imageRepository = getCustomRepository(SQLImageRepository);

    const images = await imageRepository.findAll();

    return images;
  }
}

export default ListAllImagesService;

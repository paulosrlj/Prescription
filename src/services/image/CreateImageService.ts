import { getCustomRepository } from 'typeorm';

import Image from '../../entities/Image';
import IImageRequest from '../../dto/IImageRequest';
import ImageRepository from '../../repositories/implementations/ImageRepository';

class CreateImageService {
  async execute(imageParams: IImageRequest): Promise<Image> {
    const imageRepository = getCustomRepository(ImageRepository);

    const image = await imageRepository.createImage(imageParams);

    return image;
  }
}

export default CreateImageService;

import { getCustomRepository, ObjectType } from 'typeorm';

import Image from '../../entities/Image';
import IImageRequest from '../../dto/IImageRequest';
import { IImageRepository } from '../../repositories/IImageRepository';

class CreateImageService {
  ImageRepository: IImageRepository;

  constructor(ImageRepository: IImageRepository) {
    this.ImageRepository = ImageRepository;
  }

  async execute(imageParams: IImageRequest): Promise<Image> {
    const imageRepository = getCustomRepository(
      this.ImageRepository as unknown as ObjectType<IImageRepository>,
    );

    const image = await imageRepository.createImage(imageParams);

    return image;
  }
}

export default CreateImageService;

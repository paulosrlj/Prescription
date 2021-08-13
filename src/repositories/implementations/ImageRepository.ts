import { DeleteResult, EntityRepository, Repository } from 'typeorm';

import Image from '../../entities/Image';
import IImageRequest from '../../dto/IImageRequest';

@EntityRepository(Image)
class ImageRepository extends Repository<Image> {
  async createImage(imageParams: IImageRequest): Promise<Image> {
    const image = this.create(imageParams);

    await this.save(image);

    return image;
  }

  async findAll(): Promise<Image[]> {
    return this.find({
      select: ['id', 'name'],
      relations: ['recipe'],
    });
  }

  async findById(id: string): Promise<Image | undefined> {
    return this.findOne(id, {
      select: ['id', 'name'],
      relations: ['recipe'],
    });
  }

  async deleteById(id: string): Promise<DeleteResult> {
    const image = await this.delete(id);
    return image;
  }
}

export default ImageRepository;

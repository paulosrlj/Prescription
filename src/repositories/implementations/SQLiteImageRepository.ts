import {
  DeleteResult,
  EntityRepository,
  getCustomRepository,
  Repository,
} from 'typeorm';

import Image from '../../entities/Image';
import IImageRequest from '../../dto/IImageRequest';
import { IImageRepository } from '../IImageRepository';
// import SQLiteRecipeRepository from './SQLiteRecipeRepository';
// import ApplicationErrors from '../../errors/ApplicationErrors';

@EntityRepository(Image)
class SQLImageRepository extends Repository<Image> implements IImageRepository {
  async createImage(imageParams: IImageRequest): Promise<Image> {
    const { name, path } = imageParams;

    const image = this.create({ name, path });
    await this.save(image);

    return image;
  }

  async findAll(): Promise<Image[]> {
    return this.find({
      select: ['id', 'name', 'path'],
      relations: ['recipe'],
    });
  }

  async findById(id: string): Promise<Image | undefined> {
    return this.findOne(id);
  }

  async deleteById(id: string): Promise<DeleteResult> {
    const image = await this.delete(id);
    return image;
  }
}

export default SQLImageRepository;

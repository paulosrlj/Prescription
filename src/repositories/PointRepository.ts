import { EntityRepository, Repository } from 'typeorm';
import Point from '../entities/Point';

import IPoint from '../dto/IPointRequest';

@EntityRepository(Point)
class PointRepository extends Repository<Point> {
  async createPoint({
    lat,
    lng,
  }: IPoint): Promise<Point> {
    const point = this.create({
      lat,
      lng,
    });

    await this.save(point);

    return point;
  }

  async findAll(): Promise<Point[]> {
    return this.find({
      select: ['id', 'lat', 'lng'],
    });
  }
}

export default PointRepository;

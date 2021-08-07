import { getCustomRepository } from 'typeorm';

import PointRepository from '../../repositories/PointRepository';
import Point from '../../entities/Point';

class ListPointService {
  async execute(): Promise<Point[]> {
    const pointRepository = getCustomRepository(PointRepository);

    const points = await pointRepository.findAll();

    return points;
  }
}

export default ListPointService;

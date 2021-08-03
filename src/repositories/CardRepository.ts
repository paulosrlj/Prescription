import { EntityRepository, Repository } from 'typeorm';

import IPatient from '../dto/IPatientRequest';
import Card from '../entities/Card';

@EntityRepository(Card)
class CardRepository extends Repository<Card> {
  async findAll(): Promise<Card[]> {
    return this.find({
      relations: ['patient'],
    });
  }
}

export default CardRepository;

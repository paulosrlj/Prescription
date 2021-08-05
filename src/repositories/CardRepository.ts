import { EntityRepository, Repository } from 'typeorm';

import Card from '../entities/Card';
import ICard from '../dto/ICardRequest';

@EntityRepository(Card)
class CardRepository extends Repository<Card> {
  async createCard({ patient_id }: ICard): Promise<Card> {
    const card = this.create({ patient_id });

    await this.save(card);

    return card;
  }

  async findAll(): Promise<Card[]> {
    return this.find({
      select: ['quantidade_receitas'],
      relations: ['patient', 'recipes'],
    });
  }

  async findById(id: string): Promise<Card | undefined> {
    const card = await this.findOne({ id });
    return card;
  }

  async findByPatientId(patient_id: string): Promise<Card | undefined> {
    const card = await this.findOne({ patient_id });
    return card;
  }
}

export default CardRepository;

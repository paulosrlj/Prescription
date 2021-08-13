import { EntityRepository, Repository } from 'typeorm';

import Card from '../../entities/Card';
import { ICardRepository } from '../ICardRepository';

@EntityRepository(Card)
class CardRepository extends Repository<Card> implements ICardRepository {
  async createCard(): Promise<Card> {
    const card = this.create();
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

  async deleteById(id: string): Promise<void> {
    await this.delete({ id });
  }
}

export default CardRepository;

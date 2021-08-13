import { getCustomRepository, ObjectType } from 'typeorm';

import Card from '../../entities/Card';
import { ICardRepository } from '../../repositories/ICardRepository';

class ListCardService {
  CardRepository: ICardRepository;

  constructor(CardRepository: ICardRepository) {
    this.CardRepository = CardRepository;
  }

  async execute(id: string): Promise<Card> {
    const cardRepository = getCustomRepository(
      this.CardRepository as unknown as ObjectType<ICardRepository>,
    );

    const card = await cardRepository.findById(id);

    return card;
  }
}

export default ListCardService;

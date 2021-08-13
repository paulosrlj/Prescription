import { getCustomRepository, ObjectType } from 'typeorm';

import Card from '../../entities/Card';
import { ICardRepository } from '../../repositories/ICardRepository';

class CreateCardService {
  CardRepository: ICardRepository;

  constructor(CardRepository: ICardRepository) {
    this.CardRepository = CardRepository;
  }

  async execute(): Promise<Card> {
    const cardRepository = getCustomRepository(
      this.CardRepository as unknown as ObjectType<ICardRepository>,
    );

    const card = await cardRepository.createCard();

    return card;
  }
}

export default CreateCardService;

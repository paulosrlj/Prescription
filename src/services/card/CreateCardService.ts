import { getCustomRepository } from 'typeorm';

import CardRepository from '../../repositories/implementations/CardRepository';
import Card from '../../entities/Card';

class CreateCardService {
  async execute(): Promise<Card> {
    const cardRepository = getCustomRepository(CardRepository);

    const card = await cardRepository.createCard();

    return card;
  }
}

export default CreateCardService;

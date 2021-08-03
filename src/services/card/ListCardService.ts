import { getCustomRepository } from 'typeorm';

import CardRepository from '../../repositories/CardRepository';
import Card from '../../entities/Card';

class ListCardService {
  async execute(): Promise<Card[]> {
    const cardRepository = getCustomRepository(CardRepository);

    const cards = await cardRepository.findAll();

    return cards;
  }
}

export default ListCardService;

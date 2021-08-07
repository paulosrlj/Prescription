import { EntityRepository, Repository } from 'typeorm';

import Card from '../entities/Card';
import ICard from '../dto/ICardRequest';

@EntityRepository(Card)
class CardRepository extends Repository<Card> {}

export default CardRepository;

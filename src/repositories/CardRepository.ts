import { EntityRepository, Repository } from 'typeorm';

import IPatient from '../dto/IPatientRequest';
import Card from '../entities/Card';

@EntityRepository(Card)
class CardRepository extends Repository<Card> {}

export default CardRepository;

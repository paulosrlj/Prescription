import Card from '../entities/Card';

export interface ICardRepository {
  createCard(): Promise<Card>;
  findAll(): Promise<Card[]>;
  findById(id: string): Promise<Card>;
}

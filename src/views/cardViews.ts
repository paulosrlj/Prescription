import Card from '../entities/Card';

export interface CardResponse {
  id: string;
  quantidade_receitas: number;
}

export function handleCard(card: Card): CardResponse {
  return {
    id: card.id,
    quantidade_receitas: card.quantidade_receitas,
  };
}

import { CategoriaMovimento } from './categoria-movimento.enum';

export interface Movimento {
  id?: number;
  nome: string;
  categoria: CategoriaMovimento;
  descricao?: string;
}
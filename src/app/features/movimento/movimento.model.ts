import { CategoriaMovimento } from './categoria-movimento.enum';

export interface Movimento {
  id?: number;
  nome: string;
  tipo: CategoriaMovimento;
  descricao?: string;
}
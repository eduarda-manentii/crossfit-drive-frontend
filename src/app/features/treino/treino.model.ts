export interface Treino {
  id?: number;
  nome: string;
  tipo: string;
  data: string;
  repeticaoEstimada?: number; // era 'rounds' no form
  repeticaoFeita?: number;    // era 'score' no form
  tempoEstimado?: number;     // era 'tempoEsperado' no form
  tempoFeito?: number;        // era 'tempoReal' no form
  observacao?: string;        // era 'notas' no form
  midiaUrl?: string;          // campo para a URL do S3
  movimentos: MovimentoTreino[];
}

export interface MovimentoTreino {
  movimentoId: number;
  repeticao?: number;
  carga?: number;
  unidadeMedida?: string;
}
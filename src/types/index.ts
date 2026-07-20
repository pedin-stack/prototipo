export const LOTACOES = ['Livre', 'Lotando', 'Lotado'] as const;
export type Lotacao = (typeof LOTACOES)[number];

export interface Linha {
  id: number;
  nome: string;
  horarios: string[];
  ponto: string;
  lotacao: Lotacao;
}

export interface Alerta {
  id: number;
  titulo: string;
  descricao: string;
}

export interface Manifestacao {
  id: number;
  nome: string;
  linha: string;
  tipo: string;
  mensagem: string;
}

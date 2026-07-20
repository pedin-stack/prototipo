export interface Linha {
  id: number;
  nome: string;
  horarios: string[];
  ponto: string;
  vagasOcupadas: number;
  vagasTotais: number;
  favorita?: boolean;
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

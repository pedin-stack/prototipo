import type { Alerta, Linha } from '../types';

// ponytail: dados mockados no lugar da camada api/ — trocar por services quando houver backend
export const LINHAS: Linha[] = [
  { id: 1, nome: 'Irecê x Canarana', horarios: ['06h30', '12h00', '17h45', '19h30'], ponto: 'Rodoviária', vagasOcupadas: 12, vagasTotais: 16 },
  { id: 2, nome: 'Lapão x Irecê', horarios: ['05h50', '11h30', '18h00', '20h15'], ponto: 'Ponto central', vagasOcupadas: 15, vagasTotais: 20 },
  { id: 3, nome: 'Uibaí x Irecê', horarios: ['06h15', '13h00', '18h15', '21h00'], ponto: 'Rodoviária', vagasOcupadas: 40, vagasTotais: 40 },
  { id: 4, nome: 'João Dourado x Irecê', horarios: ['06h00', '12h30', '17h30'], ponto: 'Praça da matriz', vagasOcupadas: 5, vagasTotais: 16 },
  { id: 5, nome: 'Ibititá x Irecê', horarios: ['06h45', '13h15', '18h30'], ponto: 'Rodoviária', vagasOcupadas: 8, vagasTotais: 30 },
  { id: 6, nome: 'Barra do Mendes x Irecê', horarios: ['05h30', '12h15', '17h00'], ponto: 'Ponto central', vagasOcupadas: 24, vagasTotais: 24 },
];

export const ALERTAS: Alerta[] = [
  { id: 1, titulo: 'Atraso na linha Lapão x Irecê', descricao: 'Saída das 17h30 prevista para 18h00' },
];

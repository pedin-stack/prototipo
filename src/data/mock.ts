import type { Alerta, Linha } from '../types';

// ponytail: dados mockados no lugar da camada api/ — trocar por services quando houver backend
export const LINHAS: Linha[] = [
  { id: 1, nome: 'Irecê x Xique-Xique', horarios: ['06h30', '12h00', '17h45', '19h30'], ponto: 'Rodoviária', lotacao: 'Livre' },
  { id: 2, nome: 'Lapão x Irecê', horarios: ['05h50', '11h30', '18h00', '20h15'], ponto: 'Ponto central', lotacao: 'Enchendo' },
  { id: 3, nome: 'Uibaí x Irecê', horarios: ['06h15', '13h00', '18h15', '21h00'], ponto: 'Rodoviária', lotacao: 'Cheio' },
  { id: 4, nome: 'João Dourado x Irecê', horarios: ['06h00', '12h30', '17h30'], ponto: 'Praça da matriz', lotacao: 'Livre' },
  { id: 5, nome: 'Central x Irecê', horarios: ['06h45', '13h15', '18h30'], ponto: 'Rodoviária', lotacao: 'Livre' },
  { id: 6, nome: 'Barra do Mendes x Irecê', horarios: ['05h30', '12h15', '17h00'], ponto: 'Ponto central', lotacao: 'Enchendo' },
];

export const ALERTAS: Alerta[] = [
  { id: 1, titulo: 'Atraso na linha Lapão x Irecê', descricao: 'Saída das 17h30 prevista para 18h00' },
];

import { z } from 'zod';

export const linhaSchema = z.object({
  nome: z.string().min(3, 'Informe o nome da linha (ex.: Lapão x Irecê)'),
  horarios: z.string().min(4, 'Informe ao menos um horário (ex.: 06h30, 12h00)'),
  ponto: z.string().min(3, 'Informe o ponto de embarque'),
  vagasTotais: z.coerce.number().min(1, 'A capacidade não pode ser zero'),
});
export type LinhaSchema = z.infer<typeof linhaSchema>;

export const avisoSchema = z.object({
  titulo: z.string().min(5, 'Informe o título do aviso'),
  descricao: z.string().min(5, 'Descreva o atraso ou cancelamento'),
});
export type AvisoSchema = z.infer<typeof avisoSchema>;

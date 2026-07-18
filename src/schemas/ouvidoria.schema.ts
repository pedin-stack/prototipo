import { z } from 'zod';

export const TIPOS_MANIFESTACAO = ['Reclamação', 'Sugestão', 'Elogio'] as const;

export const ouvidoriaSchema = z.object({
  nome: z.string().min(3, 'Informe seu nome'),
  linha: z.string().min(1, 'Selecione a linha'),
  tipo: z.enum(TIPOS_MANIFESTACAO, {
    errorMap: () => ({ message: 'Selecione o tipo de manifestação' }),
  }),
  mensagem: z.string().min(10, 'Descreva sua manifestação com pelo menos 10 caracteres'),
});

export type OuvidoriaSchema = z.infer<typeof ouvidoriaSchema>;

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Erro, ESTILO_CAMPO } from '../components/form';
import { useDados } from '../context/DadosContext';
import {
  ouvidoriaSchema,
  TIPOS_MANIFESTACAO,
  type OuvidoriaSchema,
} from '../schemas/ouvidoria.schema';

export default function Ouvidoria() {
  const { linhas, adicionarManifestacao } = useDados();
  const [enviado, setEnviado] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OuvidoriaSchema>({ resolver: zodResolver(ouvidoriaSchema) });

  // ponytail: sem backend — a manifestação vai para o contexto e aparece no painel admin
  const onSubmit = (dados: OuvidoriaSchema) => {
    adicionarManifestacao(dados);
    setEnviado(true);
    reset();
  };

  if (enviado) {
    return (
      <div className="rounded-lg bg-green-50 p-4 text-center">
        <p className="text-sm font-medium text-green-700">Manifestação enviada!</p>
        <p className="mt-1 text-xs text-green-700">
          Obrigado por colaborar com o transporte do Território de Irecê.
        </p>
        <button
          type="button"
          onClick={() => setEnviado(false)}
          className="mt-3 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white"
        >
          Enviar outra
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="mb-1 text-[13px] font-medium text-gray-600">Canal de Ouvidoria</p>
      <p className="mb-3 text-xs text-gray-500">
        Reclamações, sugestões e elogios sobre as linhas do território.
      </p>

      <label className="mb-3 block text-xs font-medium text-gray-600">
        Seu nome
        <input
          type="text"
          {...register('nome')}
          aria-invalid={!!errors.nome}
          className={`mt-1 ${ESTILO_CAMPO}`}
        />
        <Erro mensagem={errors.nome?.message} />
      </label>

      <label className="mb-3 block text-xs font-medium text-gray-600">
        Linha
        <select {...register('linha')} aria-invalid={!!errors.linha} className={`mt-1 ${ESTILO_CAMPO}`}>
          <option value="">Selecione...</option>
          {linhas.map((l) => (
            <option key={l.id} value={l.nome}>
              {l.nome}
            </option>
          ))}
          <option value="Outra">Outra</option>
        </select>
        <Erro mensagem={errors.linha?.message} />
      </label>

      <label className="mb-3 block text-xs font-medium text-gray-600">
        Tipo de manifestação
        <select {...register('tipo')} aria-invalid={!!errors.tipo} className={`mt-1 ${ESTILO_CAMPO}`}>
          <option value="">Selecione...</option>
          {TIPOS_MANIFESTACAO.map((tipo) => (
            <option key={tipo} value={tipo}>
              {tipo}
            </option>
          ))}
        </select>
        <Erro mensagem={errors.tipo?.message} />
      </label>

      <label className="mb-4 block text-xs font-medium text-gray-600">
        Mensagem
        <textarea
          rows={4}
          {...register('mensagem')}
          aria-invalid={!!errors.mensagem}
          className={`mt-1 resize-none ${ESTILO_CAMPO}`}
        />
        <Erro mensagem={errors.mensagem?.message} />
      </label>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white active:bg-blue-700"
      >
        Enviar manifestação
      </button>
    </form>
  );
}

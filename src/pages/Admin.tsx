import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import LinhaCard from '../components/LinhaCard';
import { Erro, ESTILO_CAMPO } from '../components/form';
import { useDados } from '../context/DadosContext';
import {
  avisoSchema,
  linhaSchema,
  type AvisoSchema,
  type LinhaSchema,
} from '../schemas/admin.schema';
import type { Linha } from '../types';


const ESTILO_BOTAO =
  'w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white active:bg-blue-700';
const ESTILO_TITULO = 'mb-2 text-[13px] font-medium text-gray-600';
const ESTILO_ROTULO = 'mb-3 block text-xs font-medium text-gray-600';

function SecaoLinhas() {
  const { linhas, salvarLinha } = useDados();
  const [editando, setEditando] = useState<Linha | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinhaSchema>({ resolver: zodResolver(linhaSchema) });

  const iniciarEdicao = (linha: Linha) => {
    setEditando(linha);
    reset({ nome: linha.nome, horarios: linha.horarios.join(', '), ponto: linha.ponto, vagasTotais: linha.vagasTotais });
  };

  const cancelar = () => {
    setEditando(null);
    reset({ nome: '', horarios: '', ponto: '', vagasTotais: 16 });
  };

  const onSubmit = (dados: LinhaSchema) => {
    salvarLinha({
      id: editando?.id,
      nome: dados.nome,
      ponto: dados.ponto,
      horarios: dados.horarios.split(/[,·]/).map((h) => h.trim()).filter(Boolean),
      vagasOcupadas: editando?.vagasOcupadas ?? 0,
      vagasTotais: dados.vagasTotais,
    });
    cancelar();
  };

  return (
    <section className="mb-6">
      <p className={ESTILO_TITULO}>Linhas · toque na lotação para alterar o status</p>
      {linhas.map((linha) => (
        <LinhaCard key={linha.id} linha={linha} onEditar={() => iniciarEdicao(linha)} />
      ))}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3 rounded-lg bg-gray-50 p-3">
        <p className="mb-2 text-xs font-medium text-gray-700">
          {editando ? `Editando: ${editando.nome}` : 'Nova linha'}
        </p>
        <label className={ESTILO_ROTULO}>
          Nome
          <input type="text" {...register('nome')} aria-invalid={!!errors.nome} className={`mt-1 ${ESTILO_CAMPO}`} />
          <Erro mensagem={errors.nome?.message} />
        </label>
        <label className={ESTILO_ROTULO}>
          Horários (separados por vírgula)
          <input type="text" {...register('horarios')} aria-invalid={!!errors.horarios} className={`mt-1 ${ESTILO_CAMPO}`} />
          <Erro mensagem={errors.horarios?.message} />
        </label>
        <label className={ESTILO_ROTULO}>
          Ponto de embarque
          <input type="text" {...register('ponto')} aria-invalid={!!errors.ponto} className={`mt-1 ${ESTILO_CAMPO}`} />
          <Erro mensagem={errors.ponto?.message} />
        </label>
        <label className={ESTILO_ROTULO}>
          Capacidade do veículo (vagas)
          <input type="number" {...register('vagasTotais')} aria-invalid={!!errors.vagasTotais} className={`mt-1 ${ESTILO_CAMPO}`} />
          <Erro mensagem={errors.vagasTotais?.message} />
        </label>
        <button type="submit" className={ESTILO_BOTAO}>
          {editando ? 'Salvar alterações' : 'Adicionar linha'}
        </button>
        {editando && (
          <button type="button" onClick={cancelar} className="mt-2 w-full py-1 text-xs text-gray-500">
            Cancelar edição
          </button>
        )}
      </form>
    </section>
  );
}

function SecaoAvisos() {
  const { alertas, adicionarAlerta, removerAlerta } = useDados();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AvisoSchema>({ resolver: zodResolver(avisoSchema) });

  const onSubmit = (dados: AvisoSchema) => {
    adicionarAlerta(dados);
    reset();
  };

  return (
    <section className="mb-6">
      <p className={ESTILO_TITULO}>Avisos de atraso</p>
      {alertas.length === 0 && <p className="mb-2 text-sm text-gray-500">Nenhum aviso ativo.</p>}
      {alertas.map((alerta) => (
        <div
          key={alerta.id}
          className="mb-2 flex items-start justify-between gap-2 rounded-lg bg-amber-50 px-3 py-2.5"
        >
          <div>
            <p className="text-[13px] font-medium text-amber-700">{alerta.titulo}</p>
            <p className="text-xs text-amber-700">{alerta.descricao}</p>
          </div>
          <button
            type="button"
            onClick={() => removerAlerta(alerta.id)}
            className="shrink-0 text-xs text-red-600"
          >
            Remover
          </button>
        </div>
      ))}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-3 rounded-lg bg-gray-50 p-3">
        <p className="mb-2 text-xs font-medium text-gray-700">Novo aviso</p>
        <label className={ESTILO_ROTULO}>
          Título
          <input
            type="text"
            placeholder="Atraso na linha Lapão x Irecê"
            {...register('titulo')}
            aria-invalid={!!errors.titulo}
            className={`mt-1 ${ESTILO_CAMPO}`}
          />
          <Erro mensagem={errors.titulo?.message} />
        </label>
        <label className={ESTILO_ROTULO}>
          Descrição
          <input
            type="text"
            placeholder="Saída das 17h30 prevista para 18h00"
            {...register('descricao')}
            aria-invalid={!!errors.descricao}
            className={`mt-1 ${ESTILO_CAMPO}`}
          />
          <Erro mensagem={errors.descricao?.message} />
        </label>
        <button type="submit" className={ESTILO_BOTAO}>
          Publicar aviso
        </button>
      </form>
    </section>
  );
}

function SecaoManifestacoes() {
  const { manifestacoes } = useDados();

  return (
    <section>
      <p className={ESTILO_TITULO}>Ouvidoria (Reclamações, Elogios, etc)</p>
      {manifestacoes.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma manifestação recebida ainda.</p>
      ) : (
        manifestacoes.map((m) => (
          <div key={m.id} className="mb-2 rounded-lg border border-gray-200 px-3 py-2.5">
            <p className="text-sm font-medium text-gray-900">
              {m.tipo} · {m.linha}
            </p>
            <p className="mt-0.5 text-xs text-gray-500">{m.nome}</p>
            <p className="mt-1 text-sm text-gray-700">{m.mensagem}</p>
          </div>
        ))
      )}
    </section>
  );
}

export default function Admin() {
  const { restaurarExemplo } = useDados();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Painel de Controle</h2>
      </div>
      <SecaoLinhas />
      <SecaoAvisos />
      <SecaoManifestacoes />
      <button
        type="button"
        onClick={() => {
          if (confirm('Descartar todas as alterações e voltar aos dados de exemplo?')) {
            restaurarExemplo();
          }
        }}
        className="mt-6 w-full rounded-lg border border-gray-300 py-2 text-sm text-gray-600 active:bg-gray-50"
      >
        Restaurar dados de exemplo
      </button>
    </div>
  );
}

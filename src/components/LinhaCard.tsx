import { useDados } from '../context/DadosContext';
import type { Linha, Lotacao } from '../types';

const ESTILO_LOTACAO: Record<Lotacao, string> = {
  Livre: 'bg-green-100 text-green-700',
  Lotando: 'bg-amber-100 text-amber-700',
  Lotado: 'bg-red-100 text-red-700',
};

interface LinhaCardProps {
  linha: Linha;
  onEditar?: () => void;
}

export default function LinhaCard({ linha, onEditar }: LinhaCardProps) {
  const { informarLotacao } = useDados();

  return (
    <div className="mb-2 flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2.5">
      <div>
        <p className="text-sm font-medium text-gray-900">
          {String(linha.id).padStart(2, '0')} – {linha.nome}
        </p>
        <p className="text-xs text-gray-500">
          {linha.horarios.join(' · ')} · {linha.ponto}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <button
          type="button"
          onClick={() => informarLotacao(linha.id)}
          title="Toque para informar a lotação"
          className={`rounded-lg px-2 py-0.5 text-xs whitespace-nowrap ${ESTILO_LOTACAO[linha.lotacao]}`}
        >
          {linha.lotacao}
        </button>
        {onEditar && (
          <button type="button" onClick={onEditar} className="text-xs text-blue-600">
            Editar
          </button>
        )}
      </div>
    </div>
  );
}

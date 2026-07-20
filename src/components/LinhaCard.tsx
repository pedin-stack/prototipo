import { useDados } from '../context/DadosContext';
import type { Linha } from '../types';
import { IconStar, IconStarFilled } from './Icons';

function getEstiloLotacao(ocupadas: number, totais: number) {
  const porcentagem = totais > 0 ? ocupadas / totais : 0;
  if (porcentagem < 0.5) return 'bg-green-100 text-green-700';
  if (porcentagem < 0.9) return 'bg-amber-100 text-amber-700';
  return 'bg-red-100 text-red-700';
}

interface LinhaCardProps {
  linha: Linha;
  onEditar?: () => void;
}

export default function LinhaCard({ linha, onEditar }: LinhaCardProps) {
  const { informarLotacao, alternarFavorito, perfil } = useDados();
  const podeAlterarLotacao = perfil === 'admin';

  return (
    <div className="mb-2 flex items-center justify-between gap-2 rounded-lg border border-gray-200 pr-3 pl-2 py-2.5 shadow-sm active:scale-[0.99] transition-transform">
      <div className="flex items-start gap-2">
        <button 
          type="button" 
          onClick={() => alternarFavorito(linha.id)} 
          className="mt-0.5 shrink-0 text-yellow-400 p-1 rounded-md active:scale-90 transition-transform"
          title={linha.favorita ? "Remover dos favoritos" : "Adicionar aos favoritos"}
        >
          {linha.favorita ? <IconStarFilled size={20} /> : <IconStar size={20} className="text-gray-300" />}
        </button>
        <div>
          <p className="text-sm font-medium text-gray-900">
            {String(linha.id).padStart(2, '0')} – {linha.nome}
          </p>
          <p className="text-xs text-gray-500">
            {linha.horarios.join(' · ')} · {linha.ponto}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <button
          type="button"
          onClick={() => podeAlterarLotacao && informarLotacao(linha.id)}
          title={podeAlterarLotacao ? "Toque para informar a lotação" : "Vagas ocupadas"}
          className={`rounded-lg px-2 py-1 min-w-[70px] min-h-[30px] flex items-center justify-center text-[11px] font-bold whitespace-nowrap shadow-sm ${podeAlterarLotacao ? 'active:scale-95 transition-all cursor-pointer' : 'cursor-default'} ${getEstiloLotacao(linha.vagasOcupadas, linha.vagasTotais)}`}
        >
          {linha.vagasOcupadas}/{linha.vagasTotais} vagas
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

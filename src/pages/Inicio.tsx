import { useState } from 'react';
import AlertaBanner from '../components/AlertaBanner';
import LinhaCard from '../components/LinhaCard';
import SearchBar from '../components/SearchBar';
import { IconMapPin } from '../components/Icons';
import { useDados } from '../context/DadosContext';
import { useLinhas } from '../use/useLinhas';

export default function Inicio() {
  const { alertas, mostrarToast } = useDados();
  const { busca, setBusca, linhas } = useLinhas();
  const [rastreando, setRastreando] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const atualizarDados = () => {
    setAtualizando(true);
    setTimeout(() => {
      setAtualizando(false);
      mostrarToast('Dados atualizados com sucesso!');
    }, 800);
  };

  const linhasOrdenadas = [...linhas].sort((a, b) => (b.favorita ? 1 : 0) - (a.favorita ? 1 : 0)).slice(0, 5);

  return (
    <>
      <SearchBar valor={busca} onChange={setBusca} />

      {alertas.map((alerta) => (
        <AlertaBanner key={alerta.id} alerta={alerta} />
      ))}

      <button
        type="button"
        onClick={() => setRastreando((r) => !r)}
        className="mb-1 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white active:bg-blue-700"
      >
        <IconMapPin size={16} />
        Acompanhar em tempo real
      </button>
      {rastreando && (
        <p className="mb-1 text-center text-xs text-gray-500">
          Rastreamento por GPS chega nas próximas versões — por enquanto os horários são estimados.
        </p>
      )}

      <div className="flex items-center justify-between mt-3 mb-2">
        <p className="text-[13px] font-medium text-gray-600">Minhas rotas & Próximos horários</p>
        <button onClick={atualizarDados} className={`text-blue-600 text-[11px] font-medium p-1 rounded hover:bg-blue-50 transition-colors ${atualizando ? 'opacity-50' : ''}`}>
          {atualizando ? 'Atualizando...' : 'Atualizar'}
        </button>
      </div>

      {linhas.length === 0 ? (
        <div className="mb-4 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-8 px-4 text-center">
          <div className="mb-2 text-gray-400">
            <IconMapPin size={32} />
          </div>
          <p className="text-sm font-medium text-gray-900">Nenhuma linha encontrada</p>
          <p className="text-xs text-gray-500 mt-1">Não encontramos "{busca}". Tente buscar por destino ou bairro.</p>
        </div>
      ) : (
        linhasOrdenadas.map((linha) => <LinhaCard key={linha.id} linha={linha} />)
      )}

      <p className="mt-2 text-[11px] text-gray-400">
        Lotação gerenciada pelos administradores do sistema.
      </p>
      <p className="mt-1 text-[11px] text-gray-400">
        Horários de chegada podem variar conforme trânsito e clima.
      </p>
    </>
  );
}

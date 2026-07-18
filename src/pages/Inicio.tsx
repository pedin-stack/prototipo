import { useState } from 'react';
import AlertaBanner from '../components/AlertaBanner';
import LinhaCard from '../components/LinhaCard';
import SearchBar from '../components/SearchBar';
import { IconMapPin } from '../components/Icons';
import { useDados } from '../context/DadosContext';
import { useLinhas } from '../use/useLinhas';

export default function Inicio() {
  const { alertas } = useDados();
  const { busca, setBusca, linhas } = useLinhas();
  const [rastreando, setRastreando] = useState(false);

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

      <p className="mt-3 mb-2 text-[13px] font-medium text-gray-600">Próximos horários</p>

      {linhas.length === 0 ? (
        <p className="mb-2 text-sm text-gray-500">Nenhuma linha encontrada para “{busca}”.</p>
      ) : (
        linhas.slice(0, 3).map((linha) => <LinhaCard key={linha.id} linha={linha} />)
      )}

      <p className="mt-1 text-[11px] text-gray-400">
        Lotação informada pelos passageiros · atualizada há 5 min
      </p>
      <p className="mt-1 text-[11px] text-gray-400">
        Os horários de chegada e passagem são uma previsão e podem variar conforme trânsito e clima.
      </p>
    </>
  );
}

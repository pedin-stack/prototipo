import LinhaCard from '../components/LinhaCard';
import SearchBar from '../components/SearchBar';
import { useLinhas } from '../use/useLinhas';

export default function Horarios() {
  const { busca, setBusca, linhas } = useLinhas();

  return (
    <>
      <p className="mb-2 text-[13px] font-medium text-gray-600">Todas as linhas</p>
      <SearchBar valor={busca} onChange={setBusca} />

      {linhas.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhuma linha encontrada para “{busca}”.</p>
      ) : (
        linhas.map((linha) => <LinhaCard key={linha.id} linha={linha} />)
      )}

      <p className="mt-2 text-[11px] text-gray-400">
        Toque no indicador de lotação para informar como está o ônibus.
      </p>
    </>
  );
}

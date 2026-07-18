import { IconSearch } from './Icons';

interface SearchBarProps {
  valor: string;
  onChange: (valor: string) => void;
}

export default function SearchBar({ valor, onChange }: SearchBarProps) {
  return (
    <label className="mb-3 flex items-center gap-2 rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-500">
      <IconSearch size={16} className="shrink-0 text-gray-400" />
      <input
        type="search"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Buscar linha ou destino"
        aria-label="Buscar linha ou destino"
        className="w-full text-sm outline-none placeholder:text-gray-400"
      />
    </label>
  );
}

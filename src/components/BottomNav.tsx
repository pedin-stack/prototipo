import { IconClock, IconHome, IconMessageReport, IconSettings } from './Icons';

export type Tab = 'inicio' | 'horarios' | 'ouvidoria' | 'admin';

const ITENS = [
  { id: 'inicio', rotulo: 'Início', Icone: IconHome },
  { id: 'horarios', rotulo: 'Horários', Icone: IconClock },
  { id: 'ouvidoria', rotulo: 'Ouvidoria', Icone: IconMessageReport },
  { id: 'admin', rotulo: 'Admin', Icone: IconSettings },
] as const;

interface BottomNavProps {
  tab: Tab;
  onChange: (tab: Tab) => void;
  perfil: 'passageiro' | 'admin' | null;
}

export default function BottomNav({ tab, onChange, perfil }: BottomNavProps) {
  const itensVisiveis = ITENS.filter((item) => {
    if (item.id === 'admin' && perfil !== 'admin') return false;
    return true;
  });

  return (
    <nav className="flex justify-around border-t border-gray-200 bg-white pt-2 pb-3">
      {itensVisiveis.map(({ id, rotulo, Icone }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          aria-current={tab === id ? 'page' : undefined}
          className={`flex flex-col items-center gap-0.5 px-4 ${
            tab === id ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Icone size={18} />
          <span className="text-[11px]">{rotulo}</span>
        </button>
      ))}
    </nav>
  );
}

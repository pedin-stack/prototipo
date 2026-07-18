import { useState } from 'react';
import BottomNav, { type Tab } from './components/BottomNav';
import { IconBell, IconBus } from './components/Icons';
import { DadosProvider } from './context/DadosContext';
import Inicio from './pages/Inicio';
import Horarios from './pages/Horarios';
import Ouvidoria from './pages/Ouvidoria';
import Admin from './pages/Admin';

// ponytail: abas trocadas por useState — sem react-router até precisar de URLs;
// aba admin sem login — adicionar AuthContext/guard quando houver autenticação real
export default function App() {
  const [tab, setTab] = useState<Tab>('inicio');

  return (
    <DadosProvider>
    <div className="flex min-h-screen justify-center bg-gray-100 font-sans sm:items-center sm:py-6">
      <div className="flex min-h-screen w-full max-w-sm flex-col bg-white sm:min-h-0 sm:h-[680px] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-sm">
        <header className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <IconBus size={20} className="text-blue-600" />
            <span className="text-[17px] font-medium text-gray-900">SmartVia</span>
          </div>
          <IconBell size={20} className="text-gray-400" />
        </header>

        <main className="flex-1 overflow-y-auto px-4 pb-4">
          {tab === 'inicio' && <Inicio />}
          {tab === 'horarios' && <Horarios />}
          {tab === 'ouvidoria' && <Ouvidoria />}
          {tab === 'admin' && <Admin />}
        </main>

        <BottomNav tab={tab} onChange={setTab} />
      </div>
    </div>
    </DadosProvider>
  );
}

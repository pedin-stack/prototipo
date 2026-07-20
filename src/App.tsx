import { useState } from 'react';
import BottomNav, { type Tab } from './components/BottomNav';
import { IconBell, IconBus } from './components/Icons';
import { DadosProvider, useDados } from './context/DadosContext';
import Inicio from './pages/Inicio';
import Horarios from './pages/Horarios';
import Ouvidoria from './pages/Ouvidoria';
import Admin from './pages/Admin';

function ToastRenderer() {
  const { toastMensagem } = useDados();
  if (!toastMensagem) return null;
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
      <div className="rounded-full bg-gray-900/90 px-4 py-2 text-xs font-medium text-white shadow-lg animate-in slide-in-from-top-4 fade-in duration-300">
        {toastMensagem}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('inicio');

  return (
    <DadosProvider>
      <div className="flex min-h-screen justify-center bg-gray-100 font-sans sm:items-center sm:py-6">
        <div className="relative flex min-h-screen w-full max-w-sm flex-col bg-white sm:min-h-0 sm:h-[680px] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-sm">
          <ToastRenderer />
          
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

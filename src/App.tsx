import { useState } from 'react';
import BottomNav, { type Tab } from './components/BottomNav';
import { IconBell, IconBus } from './components/Icons';
import { useDados } from './context/DadosContext';
import Inicio from './pages/Inicio';
import Horarios from './pages/Horarios';
import Ouvidoria from './pages/Ouvidoria';
import Admin from './pages/Admin';
import LoginInicial from './pages/LoginInicial';

function ToastRenderer() {
  const { toastMensagem } = useDados();
  if (!toastMensagem) return null;
  return (
    <div className="absolute top-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-4 py-2 text-sm text-white shadow-lg animate-in slide-in-from-top-4 fade-in duration-300">
      {toastMensagem}
    </div>
  );
}

function ModalVagas() {
  const { linhaSelecionadaParaVagas, setLinhaSelecionadaParaVagas, confirmarVagas, linhas } = useDados();
  const [ocupadas, setOcupadas] = useState('');
  
  if (linhaSelecionadaParaVagas === null) return null;
  const linha = linhas.find(l => l.id === linhaSelecionadaParaVagas);
  if (!linha) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-[90%] max-w-[320px] rounded-2xl bg-white p-5 shadow-xl animate-in zoom-in-95 duration-200">
        <h3 className="mb-2 text-lg font-bold text-gray-900">Atualizar Vagas</h3>
        <p className="mb-4 text-sm text-gray-600">
          Quantas vagas estão preenchidas no momento para a linha <strong>{linha.nome}</strong>?
        </p>
        <input 
          type="number" 
          value={ocupadas}
          onChange={(e) => setOcupadas(e.target.value)}
          placeholder={`Total: ${linha.vagasTotais}`}
          className="w-full rounded-lg border border-gray-300 px-3 py-3 text-lg font-medium outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
          autoFocus
        />
        <div className="mt-5 flex gap-3">
          <button 
            type="button" 
            onClick={() => setLinhaSelecionadaParaVagas(null)}
            className="flex-1 rounded-xl bg-gray-100 py-3 text-sm font-medium text-gray-700 active:bg-gray-200"
          >
            Cancelar
          </button>
          <button 
            type="button" 
            onClick={() => confirmarVagas(linha.id, parseInt(ocupadas, 10))}
            className="flex-1 rounded-xl bg-blue-600 py-3 text-sm font-medium text-white active:bg-blue-700"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('inicio');
  const { perfil, setPerfil } = useDados();

  if (perfil === null) {
    return (
      <div className="flex min-h-screen justify-center bg-gray-100 font-sans sm:items-center sm:py-6">
        <div className="relative flex min-h-screen w-full max-w-sm flex-col bg-white sm:min-h-0 sm:h-[680px] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-sm">
          <LoginInicial />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen justify-center bg-gray-100 font-sans sm:items-center sm:py-6">
      <div className="relative flex min-h-screen w-full max-w-sm flex-col bg-white sm:min-h-0 sm:h-[680px] sm:overflow-hidden sm:rounded-2xl sm:border sm:border-gray-200 sm:shadow-sm">
        <ToastRenderer />
        <ModalVagas />
        
        <header className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-2">
            <IconBus size={20} className="text-blue-600" />
            <span className="text-[17px] font-medium text-gray-900">SmartVia</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPerfil(null)} className="text-[11px] text-gray-400 font-medium active:text-gray-600">Sair</button>
            <IconBell size={20} className="text-gray-400" />
          </div>
        </header>

          <main className="flex-1 overflow-y-auto px-4 pb-4">
            {tab === 'inicio' && <Inicio />}
            {tab === 'horarios' && <Horarios />}
            {tab === 'ouvidoria' && <Ouvidoria />}
            {tab === 'admin' && <Admin />}
          </main>

          <BottomNav tab={tab} onChange={setTab} perfil={perfil} />
        </div>
      </div>
  );
}

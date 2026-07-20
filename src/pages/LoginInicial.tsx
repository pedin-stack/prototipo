import { useState } from 'react';
import { useDados } from '../context/DadosContext';
import { IconBus, IconEye, IconEyeOff } from '../components/Icons';

export default function LoginInicial() {
  const { setPerfil } = useDados();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState('');

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario === 'adminsmartvia' && senha === 'admin123') {
      setPerfil('admin');
    } else {
      setErro('Usuário ou senha incorretos.');
    }
  };

  if (showAdminLogin) {
    return (
      <div className="flex h-full flex-col p-6 animate-in fade-in slide-in-from-right-4 duration-300">
        <button onClick={() => setShowAdminLogin(false)} className="self-start text-xs font-medium text-blue-600 mb-6">
          &larr; Voltar
        </button>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Login Administrativo</h2>
          <p className="text-sm text-gray-500">Insira suas credenciais para gerenciar o sistema.</p>
        </div>
        <form onSubmit={handleAdminLogin} className="flex flex-col gap-4">
          <label className="block text-xs font-medium text-gray-600">
            Usuário
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </label>
          <label className="block text-xs font-medium text-gray-600">
            Senha
            <div className="relative mt-1">
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 pr-10 text-sm text-gray-900 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 p-1"
              >
                {mostrarSenha ? <IconEyeOff size={18} /> : <IconEye size={18} />}
              </button>
            </div>
          </label>
          {erro && <p className="text-xs text-red-600">{erro}</p>}
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-gray-900 py-3 text-sm font-medium text-white shadow-sm active:scale-95 transition-all"
          >
            Entrar no Painel
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 shadow-inner">
          <IconBus size={36} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">SmartVia</h1>
        <p className="text-sm text-gray-500">Selecione seu perfil de acesso</p>
      </div>

      <div className="flex w-full flex-col gap-3">
        <button
          type="button"
          onClick={() => setPerfil('passageiro')}
          className="w-full rounded-xl bg-blue-600 py-3.5 font-medium text-white shadow-sm active:scale-95 transition-all"
        >
          Sou Passageiro
        </button>

        <button
          type="button"
          onClick={() => setShowAdminLogin(true)}
          className="w-full rounded-xl border border-gray-200 bg-white py-3.5 font-medium text-gray-700 active:bg-gray-50 active:scale-95 transition-all"
        >
          Acesso Administrador
        </button>
      </div>
    </div>
  );
}

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ALERTAS, LINHAS } from '../data/mock';
import type { Alerta, Linha, Manifestacao } from '../types';

export type Perfil = 'passageiro' | 'admin' | null;

interface Dados {
  linhas: Linha[];
  alertas: Alerta[];
  manifestacoes: Manifestacao[];
  perfil: Perfil;
  setPerfil: (p: Perfil) => void;
  salvarLinha: (linha: Omit<Linha, 'id'> & { id?: number }) => void;
  informarLotacao: (id: number) => void;
  reservas: number[];
  reservarVaga: (id: number) => void;
  alternarFavorito: (id: number) => void;
  adicionarAlerta: (alerta: Omit<Alerta, 'id'>) => void;
  removerAlerta: (id: number) => void;
  adicionarManifestacao: (manifestacao: Omit<Manifestacao, 'id'>) => void;
  restaurarExemplo: () => void;
  toastMensagem: string | null;
  mostrarToast: (msg: string) => void;
}

const DadosContext = createContext<Dados | null>(null);

function proximoId(itens: { id: number }[]) {
  return Math.max(0, ...itens.map((i) => i.id)) + 1;
}

// ponytail: persistência em localStorage, sem versionamento de schema —
// se o formato dos dados mudar, limpar as chaves "smartvia.*" no navegador
function useEstadoPersistido<T>(chave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo ? (JSON.parse(salvo) as T) : inicial;
    } catch {
      return inicial;
    }
  });

  useEffect(() => {
    localStorage.setItem(chave, JSON.stringify(valor));
  }, [chave, valor]);

  return [valor, setValor] as const;
}

export function DadosProvider({ children }: { children: ReactNode }) {
  const [linhas, setLinhas] = useEstadoPersistido('smartvia.linhas.v5', LINHAS);
  const [alertas, setAlertas] = useEstadoPersistido('smartvia.alertas.v5', ALERTAS);
  const [manifestacoes, setManifestacoes] = useEstadoPersistido<Manifestacao[]>(
    'smartvia.manifestacoes.v5',
    [],
  );
  // ponytail: reserva por linha, sem horário nem usuário; virar registro {linhaId, horario, usuario} se precisar cancelar/histórico
  const [reservas, setReservas] = useEstadoPersistido<number[]>('smartvia.reservas.v1', []);
  const [toastMensagem, setToastMensagem] = useState<string | null>(null);
  const [perfil, setPerfil] = useState<Perfil>(null);

  const mostrarToast = (msg: string) => {
    setToastMensagem(msg);
    setTimeout(() => setToastMensagem(null), 3000);
  };

  const valor: Dados = {
    linhas,
    alertas,
    manifestacoes,
    perfil,
    setPerfil,
    salvarLinha: (linha) =>
      setLinhas((atual) =>
        linha.id
          ? atual.map((l) => (l.id === linha.id ? { ...l, ...linha, id: linha.id } : l))
          : [...atual, { ...linha, id: proximoId(atual) }],
      ),
    informarLotacao: (id) => {
      const entrada = window.prompt('Quantas vagas estão preenchidas agora?');
      if (entrada !== null && !isNaN(Number(entrada))) {
        const ocupadas = parseInt(entrada, 10);
        if (ocupadas >= 0) {
          setLinhas((atual) =>
            atual.map((l) => (l.id === id ? { ...l, vagasOcupadas: ocupadas } : l))
          );
          mostrarToast('Vagas atualizadas com sucesso!');
        } else {
          mostrarToast('Valor inválido.');
        }
      }
    },
    reservas,
    reservarVaga: (id) => {
      const linha = linhas.find((l) => l.id === id);
      if (!linha) return;
      if (reservas.includes(id)) return mostrarToast('Você já reservou uma vaga nesta linha.');
      if (linha.vagasOcupadas >= linha.vagasTotais) return mostrarToast('Linha lotada.');
      setLinhas((atual) => atual.map((l) => (l.id === id ? { ...l, vagasOcupadas: l.vagasOcupadas + 1 } : l)));
      setReservas((atual) => [...atual, id]);
      mostrarToast('Vaga reservada com sucesso!');
    },
    alternarFavorito: (id) => {
      setLinhas((atual) =>
        atual.map((l) => (l.id === id ? { ...l, favorita: !l.favorita } : l))
      );
    },
    adicionarAlerta: (alerta) => {
      setAlertas((atual) => [...atual, { ...alerta, id: proximoId(atual) }]);
      mostrarToast('Aviso publicado com sucesso.');
    },
    removerAlerta: (id) => setAlertas((atual) => atual.filter((a) => a.id !== id)),
    adicionarManifestacao: (manifestacao) => {
      setManifestacoes((atual) => [...atual, { ...manifestacao, id: proximoId(atual) }]);
      mostrarToast('Sua manifestação foi enviada!');
    },
    restaurarExemplo: () => {
      setLinhas(LINHAS);
      setAlertas(ALERTAS);
      setManifestacoes([]);
      setReservas([]);
      mostrarToast('Dados restaurados.');
    },
    toastMensagem,
    mostrarToast,
  };

  return <DadosContext.Provider value={valor}>{children}</DadosContext.Provider>;
}

export function useDados() {
  const ctx = useContext(DadosContext);
  if (!ctx) throw new Error('useDados deve ser usado dentro de DadosProvider');
  return ctx;
}

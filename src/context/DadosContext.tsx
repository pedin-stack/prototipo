import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { ALERTAS, LINHAS } from '../data/mock';
import { LOTACOES, type Alerta, type Linha, type Manifestacao } from '../types';

interface Dados {
  linhas: Linha[];
  alertas: Alerta[];
  manifestacoes: Manifestacao[];
  salvarLinha: (linha: Omit<Linha, 'id'> & { id?: number }) => void;
  informarLotacao: (id: number) => void;
  adicionarAlerta: (alerta: Omit<Alerta, 'id'>) => void;
  removerAlerta: (id: number) => void;
  adicionarManifestacao: (manifestacao: Omit<Manifestacao, 'id'>) => void;
  restaurarExemplo: () => void;
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
  const [linhas, setLinhas] = useEstadoPersistido('smartvia.linhas', LINHAS);
  const [alertas, setAlertas] = useEstadoPersistido('smartvia.alertas', ALERTAS);
  const [manifestacoes, setManifestacoes] = useEstadoPersistido<Manifestacao[]>(
    'smartvia.manifestacoes',
    [],
  );

  const valor: Dados = {
    linhas,
    alertas,
    manifestacoes,
    salvarLinha: (linha) =>
      setLinhas((atual) =>
        linha.id
          ? atual.map((l) => (l.id === linha.id ? { ...l, ...linha, id: linha.id } : l))
          : [...atual, { ...linha, id: proximoId(atual) }],
      ),
    informarLotacao: (id) =>
      setLinhas((atual) =>
        atual.map((l) =>
          l.id === id
            ? { ...l, lotacao: LOTACOES[(LOTACOES.indexOf(l.lotacao) + 1) % LOTACOES.length] }
            : l,
        ),
      ),
    adicionarAlerta: (alerta) =>
      setAlertas((atual) => [...atual, { ...alerta, id: proximoId(atual) }]),
    removerAlerta: (id) => setAlertas((atual) => atual.filter((a) => a.id !== id)),
    adicionarManifestacao: (manifestacao) =>
      setManifestacoes((atual) => [...atual, { ...manifestacao, id: proximoId(atual) }]),
    restaurarExemplo: () => {
      setLinhas(LINHAS);
      setAlertas(ALERTAS);
      setManifestacoes([]);
    },
  };

  return <DadosContext.Provider value={valor}>{children}</DadosContext.Provider>;
}

export function useDados() {
  const ctx = useContext(DadosContext);
  if (!ctx) throw new Error('useDados deve ser usado dentro de DadosProvider');
  return ctx;
}

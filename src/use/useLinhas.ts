import { useMemo, useState } from 'react';
import { useDados } from '../context/DadosContext';

// ponytail: filtro em memória sobre o estado do contexto; vira chamada de service quando existir backend
export function useLinhas() {
  const { linhas: todas } = useDados();
  const [busca, setBusca] = useState('');

  const linhas = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return todas;
    return todas.filter(
      (l) => l.nome.toLowerCase().includes(termo) || l.ponto.toLowerCase().includes(termo),
    );
  }, [busca, todas]);

  return { busca, setBusca, linhas };
}

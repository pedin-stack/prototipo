export const ESTILO_CAMPO =
  'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500';

export function Erro({ mensagem }: { mensagem?: string }) {
  return mensagem ? <p className="mt-1 text-xs text-red-600">{mensagem}</p> : null;
}

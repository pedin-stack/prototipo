import type { Alerta } from '../types';
import { IconAlertTriangle } from './Icons';

export default function AlertaBanner({ alerta }: { alerta: Alerta }) {
  return (
    <div role="alert" className="mb-3 flex items-start gap-2 rounded-lg bg-amber-50 px-3 py-2.5">
      <IconAlertTriangle size={16} className="mt-0.5 shrink-0 text-amber-600" />
      <div>
        <p className="text-[13px] font-medium text-amber-700">{alerta.titulo}</p>
        <p className="text-xs text-amber-700">{alerta.descricao}</p>
      </div>
    </div>
  );
}

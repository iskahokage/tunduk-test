import {ChevronDown, Loader2} from 'lucide-react';
import {useUpdateCandidateStatusMutation} from "@/services/api.ts";
import {ChangeEvent} from "react";
import {toast} from "sonner";
import {STATUS_CONFIG} from "@/utils/criteriaMapper.ts";


const StatusSelector = ({id, currentStatus}: { id: string, currentStatus: string }) => {
    const [updateStatus, {isLoading}] = useUpdateCandidateStatusMutation();

    const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.new;

    const handleChangeStatus = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        updateStatus({id, status: e.target.value})
            .unwrap()
            .then(() => {
                toast.success('Статус успешно обновлен');
            })
            .catch(() => {
                toast.error('Ошибка обновления');
            });
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Этап:</span>
            <div className="relative">
                <select
                    id={'status-selector'}
                    value={currentStatus}
                    disabled={isLoading}
                    onChange={handleChangeStatus}
                    className={`
            appearance-none pl-4 pr-10 py-2 rounded-xl border 
            font-bold text-sm transition-all cursor-pointer outline-none
            focus:ring-2 focus:ring-offset-1 focus:ring-blue-500
            ${config.color}
          `}
                >
                    {Object.entries(STATUS_CONFIG).map(([key, value]) => (
                        <option key={key} value={key} className="bg-white text-gray-900 font-medium">
                            {value.label}
                        </option>
                    ))}
                </select>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-current">
                    {isLoading ? <Loader2 size={16} className="animate-spin"/> : <ChevronDown size={16}/>}
                </div>
            </div>
        </div>
    );
};

export default StatusSelector;

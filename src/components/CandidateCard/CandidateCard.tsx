import {Link} from "react-router-dom";
import {type RowComponentProps} from "react-window";
import {Calendar, ChevronRight, Code2, MapPin} from 'lucide-react';

import VerdictBadge from "@/components/VerdictBadge/VerdictBadge";
import {Candidate, CandidateStatus} from '@/types/candidate.ts';
import {memo} from "react";
import {STATUS_CONFIG} from "@/utils/criteriaMapper.ts";

interface CandidateListData {
    candidates: Candidate[];
}

const CandidateCard = memo(({
                                index,
                                candidates,
                                style
                            }: RowComponentProps<CandidateListData>) => {

        const candidate = candidates[index];

        if (!candidate) return null;

        return (
            <div style={style}>
                <Link
                    to={`/candidate/${candidate.id}`}
                    className="md:max-h-30.5 xs:max-h-67.5 group block bg-white p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {candidate.name}
                                </h3>
                                <VerdictBadge verdict={candidate.verdict}/>
                            </div>

                            <div className="flex items-center gap-2 mb-2">
                            <span className={`w-2 h-2 rounded-full ${STATUS_CONFIG[candidate.status as CandidateStatus]?.indicator
                            }`}/>
                                <span className="text-xs font-bold text-gray-500 uppercase">
                                {STATUS_CONFIG[candidate.status as CandidateStatus]?.label || 'Неизвестно'}
                            </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-2 gap-x-4 mt-3">
                                <div className="flex items-center text-sm text-gray-500 gap-1.5">
                                    <MapPin size={16} className="text-gray-400"/>
                                    {candidate.city}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 gap-1.5">
                                    <Calendar size={16} className="text-gray-400"/>
                                    Опыт: {candidate.total_exp}
                                </div>
                                <div className="flex items-center text-sm text-gray-500 gap-1.5">
                                    <Code2 size={16} className="text-gray-400"/>
                                    <span className="truncate">{candidate.stack}</span>
                                </div>
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between md:justify-end gap-4 border-t md:border-none pt-3 md:pt-0">
                            <div className="text-right hidden sm:block">
                                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Добавлен</p>
                                <p className="text-sm text-gray-600">{new Date(candidate.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div
                                className="p-2 hover:bg-blue-50 rounded-full text-gray-400 hover:text-blue-600 transition-colors">
                                <ChevronRight size={24}/>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    },

    (prev, next) => {
        // Сравниваем СУТЬ данных
        const prevUser = prev.candidates[prev.index];
        const nextUser = next.candidates[next.index];

        // Игнорируем изменения объекта style, если координаты те же самые
        const isSameStyle =
            prev.style.top === next.style.top &&
            prev.style.height === next.style.height;

        const isSameUser =
            prevUser?.id === nextUser?.id &&
            prevUser?.status === nextUser?.status;

        // Если и юзер тот же, и позиция та же — НЕ РЕНДЕРИТЬ
        return isSameUser && isSameStyle
    })

export default CandidateCard

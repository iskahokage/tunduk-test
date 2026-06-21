import {useNavigate, useParams} from 'react-router-dom';
import {useGetCandidateByIdQuery} from '../services/api';
import {ArrowLeft, ExternalLink, GraduationCap, Mail, Phone, Send} from 'lucide-react';
import ExperienceBlock from '@/components/CandidateDetail/ExperienceBlock';
import Assessment from '@/components/CandidateDetail/Assessment';
import VerdictBadge from '@/components/VerdictBadge/VerdictBadge';
import StatusSelector from "@/components/CandidateDetail/StatusSelector.tsx";
import {positionLabels} from "@/utils/criteriaMapper.ts";

const CandidateDetailPage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {data: candidate, isLoading, isError} = useGetCandidateByIdQuery(id!);

    if (isLoading) return <div className="p-20 text-center animate-pulse">Загрузка профиля...</div>;

    // Обработка 404
    if (isError || !candidate) return (
        <div className="p-20 text-center">
            <h1 className="text-4xl font-bold text-gray-300 mb-4">404</h1>
            <p className="text-gray-500 mb-6">Кандидат не найден</p>
            <button onClick={() => navigate('/')} className="text-blue-600 hover:underline">Вернуться к списку</button>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header / Nav */}
            <div className="bg-white border-b sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)} // Сохраняет фильтры в URL истории
                        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft size={20}/> Назад к списку
                    </button>
                    <div onClick={(e) => e.preventDefault()}>
                        <StatusSelector id={candidate!.id} currentStatus={candidate.status}/>
                    </div>
                    <div className="flex items-center gap-3">
                        <VerdictBadge verdict={candidate.verdict}/>
                        <a href={candidate.vc} target="_blank" rel="noreferrer"
                           className="text-gray-400 hover:text-blue-600">
                            <ExternalLink size={20}/>
                        </a>
                    </div>
                </div>
            </div>

            <main className="max-w-5xl mx-auto px-4 mt-8 space-y-6">
                {/* Profile Info */}
                <div className="bg-white p-8 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-8">
                    <div
                        className="w-24 h-24 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-blue-200 shadow-lg">
                        {candidate.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{candidate.name}</h1>
                        <p className="text-xl text-gray-500 mb-4">{positionLabels[candidate.position]} • {candidate.city}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href={`mailto:${candidate.email}`}
                               className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                <Mail size={16}/> {candidate.email}
                            </a>
                            <a href={`https://t.me/${candidate.tg.replace('@', '')}`}
                               className="flex items-center gap-2 text-gray-600 hover:text-blue-600">
                                <Send size={16}/> {candidate.tg}
                            </a>
                            {candidate.phone && (
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Phone size={16}/> {candidate.phone}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Summary */}
                <section className="bg-blue-600 text-white p-8 rounded-2xl shadow-xl shadow-blue-100">
                    <h2 className="text-xl font-bold mb-3 opacity-90">Итоговое резюме</h2>
                    <p className="text-lg leading-relaxed">{candidate.summary}</p>
                </section>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <ExperienceBlock exp={candidate.exp} total_exp={candidate.total_exp}/>
                        <Assessment criteria={candidate.criteria} questions={candidate.questions}/>
                    </div>

                    <div className="space-y-6">
                        {/* Stack */}
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <h3 className="font-bold mb-4">Технический стек</h3>
                            <div className="flex flex-wrap gap-2">
                                {candidate.stack.split(',').map(s => (
                                    <span key={s} className="px-3 py-1 bg-gray-100 rounded-md text-sm text-gray-700">
                                        {s.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="bg-white p-6 rounded-xl border shadow-sm">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <GraduationCap size={18}/> Образование
                            </h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{candidate.edu}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CandidateDetailPage;

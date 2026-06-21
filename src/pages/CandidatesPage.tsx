import {useEffect, useState} from 'react';
import {useCandidates} from '@/hooks/useCandidates.ts';
import {useDebounce} from '@/hooks/useDebounce.ts';
import {RotateCcw, Search} from 'lucide-react';
import CandidatesList from "@/components/CandidateList/CandidatesList.tsx";

const CandidatesPage = () => {
    const {
        candidates,
        isLoading,
        isFetching,
        isError,
        totalPages,
        currentPage,
        filters,
        updateParams,
        resetFilters,
        isFiltered
    } = useCandidates();
    const [searchTerm, setSearchTerm] = useState(filters.search);
    const debouncedSearch = useDebounce(searchTerm, 300);

    useEffect(() => {
        updateParams({search: debouncedSearch});
    }, [debouncedSearch]);

    if (isError) return (
        <div className="p-10 text-center text-red-500 font-medium">
            Ошибка при загрузке данных. Проверьте запуск json-server.
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Кандидаты</h1>
                        <p className="text-gray-500 mt-1">Управление базой талантов и откликами</p>
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                        Найдено: {candidates.length}
                    </div>
                </div>

                {/* Filters Panel */}
                <div
                    className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                        <input
                            type="text"
                            placeholder="Поиск по имени..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="w-full md:w-48 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.verdict}
                        onChange={(e) => updateParams({verdict: e.target.value})}
                    >
                        <option value="ВСЕ">Все вердикты</option>
                        <option value="ПОДХОДИТ">Подходит</option>
                        <option value="ЧАСТИЧНО">Частично</option>
                        <option value="НЕ ПОДХОДИТ">Не подходит</option>
                    </select>


                    <select
                        className="w-full md:w-48 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={filters.status || 'all'}
                        onChange={(e) => updateParams({status: e.target.value === 'all' ? undefined : e.target.value})}
                    >
                        <option value="all">Все статусы</option>
                        <option value="new">Новый</option>
                        <option value="in_review">На рассмотрении</option>
                        <option value="invited">Приглашён</option>
                        <option value="rejected">Отклонён</option>
                    </select>

                    <select
                        className="w-full md:w-48 p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={`${filters.sortBy}-${filters.order}`}
                        onChange={(e) => {
                            const [sortBy, order] = e.target.value.split('-');
                            updateParams({sortBy, order});
                        }}
                    >
                        <option value="createdAt-desc">Сначала новые</option>
                        <option value="name-asc">Имя (А-Я)</option>
                        <option value="total_exp-desc">Опыт (max)</option>
                    </select>
                    {isFiltered && (
                        <button
                            onClick={() => {
                                resetFilters()
                                setSearchTerm('')
                            }}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                            title="Сбросить все фильтры"
                        >
                            <RotateCcw size={16}/>
                            <span className="hidden lg:inline">Сбросить</span>
                        </button>
                    )}
                </div>

                {/* Candidates List */}
                <div
                    className={`space-y-4 transition-opacity duration-200 ${isFetching ? 'opacity-50' : 'opacity-100'}`}>
                    {isLoading ? (
                        // Простой скелетон
                        Array.from({length: 5}).map((_, i) => (
                            <div key={i} className="h-24 bg-gray-200 animate-pulse rounded-xl"/>
                        ))
                    ) : candidates.length > 0 ? (
                        <CandidatesList candidates={candidates}/>
                    ) : (
                        <div className="bg-white py-20 rounded-xl border border-dashed border-gray-300 text-center">
                            <RotateCcw className="mx-auto text-gray-300 mb-4" size={48}/>
                            <p className="text-gray-500 font-medium">Никого не нашли по таким фильтрам</p>
                            <button
                                onClick={() => {
                                    updateParams({search: '', verdict: 'ВСЕ', status: undefined})
                                    setSearchTerm('')
                                }}
                                className="mt-4 text-blue-600 hover:underline text-sm"
                            >
                                Сбросить фильтры
                            </button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center items-center gap-2 mt-10">
                    {totalPages > 1 && (
                        <>
                            {Array.from({length: totalPages}).map((_, i) => {
                                const pageNum = i + 1;
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => updateParams({page: pageNum})}
                                        className={`w-10 h-10 rounded-lg font-medium transition-all ${
                                            currentPage === pageNum
                                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                        </>
                    )}
                    <div className={'ml-8 flex gap-1.5 items-center'}>
                            <span>
                                Показать записей:
                            </span>
                        <select
                            className="p-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                            value={filters.limit}
                            onChange={(e) => updateParams({limit: e.target.value, page: 1})}>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="all">Все</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatesPage;

import {useCallback, useMemo} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useGetCandidatesQuery} from '../services/api';
import {SortField, SortOrder} from '../types/candidate.ts';

export const useCandidates = () => {
    const [searchParams, setSearchParams] = useSearchParams();


    const search = searchParams.get('search') || '';
    const verdict = (searchParams.get('verdict')) || 'ВСЕ';
    const page = parseInt(searchParams.get('page') || '1', 10);
    const sortBy = (searchParams.get('sortBy') as SortField) || 'createdAt';
    const order = (searchParams.get('order') as SortOrder) || 'desc';
    const status = (searchParams.get('status')) || '';

    const limitParam = (searchParams.get('limit') || '10');
    const limit = limitParam === 'all' ? undefined : parseInt(limitParam, 10);

    const {data, isLoading, isFetching, isError} = useGetCandidatesQuery({
        page: limit ? page : undefined,
        limit,
        search,
        verdict,
        sortBy,
        order,
        status
    });

    const filters = useMemo(() => ({
        search,
        verdict,
        sortBy,
        order,
        status,
        limit: limitParam
    }), [search, verdict, sortBy, order, status, limitParam]);

    const isFiltered = useMemo(() => {
        const hasVerdict = searchParams.has('verdict') && searchParams.get('verdict') !== 'ВСЕ';
        const hasStatus = searchParams.has('status') && searchParams.get('status') !== 'all';


        const hasSort = (searchParams.has('sortBy') && searchParams.get('sortBy') !== 'createdAt') ||
            (searchParams.has('order') && searchParams.get('order') !== 'desc');

        return !!(hasVerdict || hasStatus || hasSort);
    }, [searchParams]);


    const resetFilters = useCallback(() => {
        const newParams = new URLSearchParams(searchParams);

        newParams.delete('search');
        newParams.delete('verdict');
        newParams.delete('status');
        newParams.delete('sortBy');
        newParams.delete('order');
        newParams.delete('page');

        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);
    const candidates = useMemo(() => data?.data || [], [data?.data]);

    const pagination = useMemo(() => {
        const totalCount = data?.totalCount || 0;
        return {
            totalCount,
            totalPages: Math.ceil((data?.totalCount || 0) / limit!)
        };
    }, [data?.totalCount, limit]);


    const updateParams = useCallback((params: Record<string, string | number | undefined>) => {
        const newParams = new URLSearchParams(searchParams);

        Object.entries(params).forEach(([key, value]) => {
            if (!value || value === 'ВСЕ') {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });


        if (params.page === undefined) {
            newParams.set('page', '1');
        }

        setSearchParams(newParams);
    }, [searchParams, setSearchParams]);


    return {
        resetFilters,
        isFiltered,
        candidates,
        totalCount: pagination.totalCount,
        totalPages: pagination.totalPages,
        currentPage: page,
        isLoading,
        isFetching,
        isError,
        filters,
        updateParams,
    };
};

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {Candidate, SortField, SortOrder} from '../types/candidate.ts';

export interface FetchCandidatesResponse {
    data: Candidate[];
    totalCount: number;
}

export interface FetchCandidateArgs {
    page?: number;
    limit?: number | string;
    search?: string;
    verdict?: string;
    sortBy?: SortField;
    order?: SortOrder;
    status?: string;
}

export const candidateApi = createApi({
    reducerPath: 'candidateApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8080'}),
    tagTypes: ['Candidate'],
    endpoints: (builder) => ({
        getCandidates: builder.query<FetchCandidatesResponse, FetchCandidateArgs>({
            query: ({page, limit, search, verdict, sortBy, order, status}) => ({
                url: '/candidates',
                params: {
                    _page: page,
                    _limit: limit !== 'all' ? limit : undefined,
                    name_like: search || undefined,
                    verdict: verdict !== 'ВСЕ' ? verdict : undefined,
                    _sort: sortBy,
                    _order: order,
                    status: status || undefined
                },
            }),

            transformResponse: (data: Candidate[], meta) => {
                return {
                    data,
                    totalCount: Number(meta?.response?.headers.get('x-total-count')) || 0,
                };
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({id}) => ({type: 'Candidate' as const, id})),
                        {type: 'Candidate', id: 'LIST'}
                    ]
                    : [{type: 'Candidate', id: 'LIST'}],
        }),
        getCandidateById: builder.query<Candidate, string>({
            query: (id) => `/candidates/${id}`,
            providesTags: (_result, _error, id) => [{type: 'Candidate', id}],
        }),
        updateCandidateStatus: builder.mutation<Candidate, { id: string; status: string }>({
            query: ({id, status}) => ({
                url: `/candidates/${id}`,
                method: 'PATCH',
                body: {status},
            }),

            invalidatesTags: (_result, _error, {id}) => [{type: 'Candidate', id}],

            async onQueryStarted({id, status}, {dispatch, queryFulfilled}) {

                const patchDetail = dispatch(
                    candidateApi.util.updateQueryData('getCandidateById', id, (draft) => {
                        if (draft) Object.assign(draft, {status});
                    })
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchDetail.undo();
                }
            },
        }),
    }),
});

export const {useGetCandidatesQuery, useGetCandidateByIdQuery, useUpdateCandidateStatusMutation} = candidateApi;

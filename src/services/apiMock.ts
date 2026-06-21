import {http, HttpResponse} from 'msw';
import {mockCandidates} from './mockData';
import {setupServer} from "msw/node";

const parseExp = (str: string): number => {
    const matched = str.match(/\d+/);
    return matched ? parseInt(matched[0], 10) : 0;
};
export const handlers = [
    http.get('*/candidates', ({request}) => {
        const url = new URL(request.url);
        const _sort = url.searchParams.get('_sort');
        const _order = url.searchParams.get('_order') || 'asc';
        const verdict = url.searchParams.get('verdict');
        let data = [...mockCandidates];

        if (verdict && verdict !== 'ВСЕ') {
            data = data.filter(u => u.verdict === verdict);
        }

        if (_sort) {
            data.sort((a, b) => {
                const field = _sort as keyof typeof a;


                let valA: string | number = a[field] as string;
                let valB: string | number = b[field] as string;


                if (_sort === 'total_exp') {
                    valA = parseExp(valA);
                    valB = parseExp(valB);
                }

                if (valA < valB) return _order === 'asc' ? -1 : 1;
                if (valA > valB) return _order === 'asc' ? 1 : -1;
                return 0;
            });
        }
        return HttpResponse.json(data, {
            headers: {'x-total-count': data.length.toString()}
        });
    }),

    http.get('*/candidates/:id', ({params}) => {
        const {id} = params;
        const candidate = mockCandidates.find(u => u.id === id);

        if (!candidate) {
            return new HttpResponse(null, {status: 404});
        }

        return HttpResponse.json(candidate);
    }),

    http.patch('*/candidates/:id', async ({request, params}) => {
        const {id} = params;
        const body = await request.json() as { status: string };

        return HttpResponse.json({id, ...body}, {status: 200});
    }),
];

export const server = setupServer(...handlers);

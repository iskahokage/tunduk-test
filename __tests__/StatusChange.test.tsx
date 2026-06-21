import {MemoryRouter, Route, Routes} from "react-router-dom";
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {http, HttpResponse} from 'msw';
import {vi} from "vitest";
import CandidateDetailPage from "@/pages/CandidateDetailPage.tsx";
import {store} from "@/store";
import {Provider} from "react-redux";
import {server} from "@/services/apiMock.ts";
import {singleMockCandidate} from "@/services/mockData.ts";

const {mockSuccess, mockError} = vi.hoisted(() => ({
    mockSuccess: vi.fn(),
    mockError: vi.fn(),
}));


vi.mock('sonner', () => ({
    toast: {
        success: mockSuccess,
        error: mockError
    },
}));


describe('Status Change Flow', () => {
    it('должен оптимистично менять статус и показывать уведомление', async () => {
        const candidate = userEvent.setup();
        const id = singleMockCandidate.id
        let status = singleMockCandidate.status
        server.use(
            http.patch(`*/candidates/${id}`, async ({request}) => {
                const body = await request.json() as { status: string };
                status = body.status;
                return HttpResponse.json({...singleMockCandidate, ...body});
            }),
            http.get(`*/candidates/${id}`, () => {
                return HttpResponse.json({...singleMockCandidate, status});
            })
        );

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={[`/candidate/${id}`]}>
                    <Routes>
                        <Route path="/candidate/:id" element={<CandidateDetailPage/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const nameLabel = await screen.findByText(singleMockCandidate.name);
        expect(nameLabel).toBeInTheDocument();


        const select = await screen.findByRole('combobox');
        expect(select).toHaveValue('new');

        await candidate.selectOptions(select, 'invited');


        await waitFor(() => {
            expect(select).toHaveValue('invited');
        });


        await waitFor(() => {
            expect(status).toBe('invited');
        });


        await waitFor(() => {
            expect(mockSuccess)
                .toHaveBeenCalledWith(
                    'Статус успешно обновлен'
                );
        });
    });
});

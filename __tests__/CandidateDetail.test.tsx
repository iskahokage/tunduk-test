import {render, screen, within} from "@testing-library/react";
import {Provider} from "react-redux";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {store} from "@/store";
import CandidateDetailPage from "@/pages/CandidateDetailPage";
import {server} from "@/services/apiMock";
import {http, HttpResponse} from "msw";
import {singleMockCandidate} from "@/services/mockData";

describe('Candidate Detail Page', () => {

    const id = singleMockCandidate.id


    it('должен отображать 404, если сервер вернул ошибку', async () => {
        server.use(
            http.get(`*/candidates/${id}`, () => {
                return new HttpResponse(null, {status: 404});
            })
        );

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/candidate/1']}>
                    <Routes>
                        <Route path="/candidate/:id" element={<CandidateDetailPage/>}/>
                    </Routes>
                </MemoryRouter>
            </Provider>
        );

        const errorMsg = await screen.findByText(/Кандидат не найден/i, {}, {timeout: 3000});

        expect(errorMsg).toBeInTheDocument();

        expect(screen.queryByText('Иван Иванов')).not.toBeInTheDocument();
    });
    it('должен корректно отображать контакты, стек и список опыта работы', async () => {

        server.use(
            http.get(`*/candidates/${id}`, () => {
                return HttpResponse.json(singleMockCandidate);
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

        expect(await screen.findByText(singleMockCandidate.name)).toBeInTheDocument();

        expect(screen.getByText(singleMockCandidate.email)).toBeInTheDocument();

        const company = screen.getByText(/TechCorp/i);
        const position = screen.getByText(/Frontend Developer/i);

        expect(company).toBeInTheDocument();
        expect(position).toBeInTheDocument();

        const assessmentSection = screen.getByText(/Критерии оценки/i).closest('section');

        if (assessmentSection) {
            expect(within(assessmentSection).getByText(/Redux Toolkit/i)).toBeInTheDocument();
        }

        expect(screen.getByText(/КНУ/i)).toBeInTheDocument();
    });

});

import {screen} from '@testing-library/react';
import {http, HttpResponse} from 'msw';
import {server} from "@/services/apiMock";
import {renderWithProviders} from "./utils/test-utils.tsx";
import CandidatesPage from "@/pages/CandidatesPage.tsx";

describe('Edge Cases', () => {
    it('отображает сообщение об ошибке при сбое сервера (500)', async () => {
        server.use(
            http.get('http://localhost:8080/candidates', () => {
                return new HttpResponse(null, {status: 500});
            })
        );

        renderWithProviders(<CandidatesPage/>);

        const error = await screen.findByText(/Ошибка при загрузке данных. Проверьте запуск json-server./i);
        expect(error).toBeInTheDocument();
    });

    it('отображает пустой стейт, если кандидатов нет', async () => {
        server.use(
            http.get('**/candidates', () => {
                return HttpResponse.json([], {
                    status: 200,
                    headers: {'x-total-count': '0'}
                });
            })
        );
        renderWithProviders(<CandidatesPage/>);


        const emptyMsg = await screen.findByText(/Никого не нашли/i);
        expect(emptyMsg).toBeInTheDocument();
    });
});

import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import {store} from '@/store';
import App from "@/App.tsx";
import {singleMockCandidate} from "@/services/mockData.ts";

describe('Integration: Candidates Flow', () => {
    it('переход из списка на детальную страницу по клику на карточку', async () => {
        const user = userEvent.setup();
        const name = singleMockCandidate.name;

        render(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']}>
                    <App/>
                </MemoryRouter>
            </Provider>
        );

        const candidateName = await screen.findByText(name);
        await user.click(candidateName);


        const summary = await screen.findByText(/Итоговое резюме/i);
        expect(summary).toBeInTheDocument();

        expect(screen.getByRole('heading', {name})).toBeInTheDocument();
    });
});

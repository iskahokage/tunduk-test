import userEvent from "@testing-library/user-event";
import {screen, waitFor} from "@testing-library/react";
import {renderWithProviders} from "./utils/test-utils.tsx";
import CandidatesPage from "@/pages/CandidatesPage.tsx";

describe('Candidates Filtering', () => {
    it('должен фильтровать список при выборе вердикта "ПОДХОДИТ"', async () => {
        const user = userEvent.setup();

        renderWithProviders(<CandidatesPage />);


        expect(await screen.findByText('Иванов Иван Иванович')).toBeInTheDocument();
        expect(screen.getByText('Петрова Анна Сергеевна')).toBeInTheDocument();


        const select = screen.getByDisplayValue(/Все вердикты/i);

        await user.selectOptions(select, 'ПОДХОДИТ');

        await waitFor(() => {
            expect(screen.getByText('Петрова Анна Сергеевна')).toBeInTheDocument();
            expect(screen.queryByText('Иванов Иван Иванович')).not.toBeInTheDocument();
        });
    });

    it('должен сбрасывать фильтры и показывать всех кандидатов', async () => {
        const user = userEvent.setup();
        renderWithProviders(<CandidatesPage />);

        const select = screen.getByDisplayValue(/Все вердикты/i);

        await user.selectOptions(select, 'ПОДХОДИТ');
        await waitFor(() => expect(screen.queryByText('Иванов Иван Иванович')).not.toBeInTheDocument());

        await user.selectOptions(select, 'ВСЕ');

        expect(await screen.findByText('Иванов Иван Иванович')).toBeInTheDocument();
    });
});

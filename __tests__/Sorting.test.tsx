import {screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {renderWithProviders} from './utils/test-utils';
import CandidatesPage from "@/pages/CandidatesPage";
import {mockCandidates} from "@/services/mockData";
import {store} from "@/store";
import {candidateApi} from "@/services/api";

describe('Sorting Logic', () => {
    beforeEach(() => {

        store.dispatch(candidateApi.util.resetApiState());
    });

    // Вспомогательная функция для парсинга опыта, как в MSW
    const parseExp = (str: string) => parseInt(str.match(/\d+/)?.[0] || '0', 10);

    it('должен корректно сортировать по имени (А-Я)', async () => {
        const user = userEvent.setup();
        renderWithProviders(<CandidatesPage/>);

        // 1. Находим селект по текущему значению
        const sortSelect = screen.getByDisplayValue(/Сначала новые/i);

        // 2. Выбираем "Имя (А-Я)"
        await user.selectOptions(sortSelect, 'name-asc');

        // 3. Проверяем, что первый кандидат в DOM совпадает с первым по алфавиту в моках
        await waitFor(() => {
            const headings = screen.getAllByRole('heading', {level: 3});
            const firstCandidateName = headings[0].textContent;

            // Вычисляем ожидаемое имя программно из того же источника данных
            const expectedName = [...mockCandidates].sort((a, b) =>
                a.name.localeCompare(b.name)
            )[0].name;

            expect(firstCandidateName).toBe(expectedName);
        });
    });

    it('должен корректно сортировать по ОПЫТУ (числовая сортировка)', async () => {
        const user = userEvent.setup();
        renderWithProviders(<CandidatesPage/>);

        const sortSelect = screen.getByDisplayValue(/Сначала новые/i);

        // 1. Выбираем "Опыт (max)"
        await user.selectOptions(sortSelect, 'total_exp-desc');

        // 2. Проверяем результат
        await waitFor(() => {
            const headings = screen.getAllByRole('heading', {level: 3});
            const firstCandidateName = headings[0].textContent;

            // Вычисляем программно: сортируем по числу, а не по строке
            const expectedName = [...mockCandidates].sort((a, b) =>
                parseExp(b.total_exp) - parseExp(a.total_exp)
            )[0].name;

            expect(firstCandidateName).toBe(expectedName);
        });
    });

    it('должен корректно сортировать по ДАТЕ добавления (новые сверху)', async () => {
        const user = userEvent.setup();
        renderWithProviders(<CandidatesPage/>);

        const sortSelect = screen.getByDisplayValue(/Сначала новые/i);

        await user.selectOptions(sortSelect, 'createdAt-desc');

        await waitFor(() => {
            const headings = screen.getAllByRole('heading', {level: 3});
            const firstCandidateName = headings[0].textContent;

            const expectedName = [...mockCandidates].sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )[0].name;

            expect(firstCandidateName).toBe(expectedName);
        });
    });
});

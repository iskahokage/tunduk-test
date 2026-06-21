import { render, screen } from '@testing-library/react';
import VerdictBadge from "@/components/VerdictBadge/VerdictBadge.tsx";

describe('VerdictBadge Component', () => {
    it('отображает правильный цвет для статуса ПОДХОДИТ', () => {
        render(<VerdictBadge verdict="ПОДХОДИТ" />);
        const badge = screen.getByText(/ПОДХОДИТ/i);
        expect(badge).toHaveClass('text-green-700');
    });

    it('отображает правильный цвет для статуса НЕ ПОДХОДИТ', () => {
        render(<VerdictBadge verdict="НЕ ПОДХОДИТ" />);
        const badge = screen.getByText(/НЕ ПОДХОДИТ/i);
        expect(badge).toHaveClass('text-red-700');
    });
});

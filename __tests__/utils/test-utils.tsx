import {ReactElement} from 'react';
import {render, RenderOptions} from '@testing-library/react';
import AllTheProviders from "./AllProviders.tsx"; // Путь к твоему стору


const renderWithProviders = (
    ui: ReactElement,
    options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, {wrapper: AllTheProviders, ...options});

export {renderWithProviders};

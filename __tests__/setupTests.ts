import '@testing-library/jest-dom';
import {vi} from 'vitest';
import {server} from "@/services/apiMock.ts";
import {store} from "@/store";
import {candidateApi} from "@/services/api.ts";

beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => {
    server.resetHandlers();
    store.dispatch(candidateApi.util.resetApiState());
});
afterAll(() => server.close());

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

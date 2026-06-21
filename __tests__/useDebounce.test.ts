import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import {useDebounce} from "@/hooks/useDebounce.ts";

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('должен возвращать начальное значение сразу', () => {
        const { result } = renderHook(() => useDebounce('hello', 500));
        expect(result.current).toBe('hello');
    });

    it('не должен обновлять значение до истечения времени', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        );

        rerender({ value: 'updated', delay: 500 });


        expect(result.current).toBe('initial');

        act(() => {
            vi.advanceTimersByTime(200);
        });
        expect(result.current).toBe('initial');
    });

    it('должен обновить значение после истечения указанной задержки', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'initial', delay: 500 },
            }
        );

        rerender({ value: 'updated', delay: 500 });

        // Проматываем время полностью
        act(() => {
            vi.advanceTimersByTime(500);
        });

        expect(result.current).toBe('updated');
    });

    it('должен сбрасывать таймер, если значение изменилось слишком быстро', () => {
        const { result, rerender } = renderHook(
            ({ value, delay }) => useDebounce(value, delay),
            {
                initialProps: { value: 'first', delay: 500 },
            }
        );

        // Первое изменение
        rerender({ value: 'second', delay: 500 });

        act(() => {
            vi.advanceTimersByTime(300); // Прошло 300мс
        });

        // Второе изменение (таймер должен перезапуститься)
        rerender({ value: 'third', delay: 500 });

        act(() => {
            vi.advanceTimersByTime(300); // Суммарно с прошлого раза прошло 600мс, но с последнего изменения всего 300мс
        });

        // Все еще 'first', так как новый таймер на 500мс не истек
        expect(result.current).toBe('first');

        act(() => {
            vi.advanceTimersByTime(200); // Добиваем до 500мс для последнего изменения
        });

        expect(result.current).toBe('third');
    });
});

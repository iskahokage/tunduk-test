import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: ['__tests__/setupTests.ts'], // если нужно расширение matchers
            coverage: {
                provider: 'v8', // или 'istanbul'
                reporter: ['text', 'json', 'html'], // 'html' создаст красивую папку с отчетом
                include: ['src/**/*'],
                exclude: [
                    'src/main.tsx',
                    'src/vite-env.d.ts',
                    '**/*.test.tsx',
                    '**/*.test.ts',
                    'src/types/**', // Типы тестировать не нужно
                ],
                // Можно задать порог, ниже которого билд упадет (Strong Middle уровень!)
                thresholds: {
                    lines: 70,
                    functions: 70,
                    branches: 70,
                    statements: 70
                }
            },
        },
    })
);

# 🎯 Candidate Management System (HR Portal)

Профессиональное SPA-приложение для управления базой кандидатов. Реализовано с акцентом на производительность, масштабируемость и отличный UX.

## 🚀 Стек технологий

- **Frontend**: React 18 + TypeScript + Vite
- **State Management**: Redux Toolkit + RTK Query (кеширование, автоматическая синхронизация)
- **Routing**: React Router 7 (синхронизация фильтров с URL)
- **Styling**: Tailwind CSS
- **Testing**: Vitest + React Testing Library + MSW v2 (Mock Service Worker)
- **Virtualization**: React Window (оптимизация списков на 100+ элементов)
- **UI Components**: Lucide Icons + Sonner (Toasts)

## ✨ Ключевые особенности

1.  **URL as Single Source of Truth**: Все фильтры, поиск, пагинация и лимиты сохраняются в URL. Ссылкой с настроенным поиском можно поделиться.
2.  **Optimistic UI**: Изменение статуса кандидата происходит мгновенно в интерфейсе с автоматическим откатом (rollback) при ошибке сервера.
3.  **Глубокая оптимизация**: 
    - Виртуализация списка для экономии DOM-узлов.
    - Мемоизация карточек (`React.memo`) и тяжелых вычислений (`useMemo`).
    - Стабильность ссылок для предотвращения лишних ререндеров.
4.  **Сетевой слой**: Полная имитация работы бэкенда через MSW в тестовой среде.
## 🛠 Запуск проекта

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск Mock-сервера (json-server)
Приложение ожидает бэкенд на порту 8080.
```bash
npx json-server --watch mock/candidates-large.json --port 8080
```

### 3. Запуск Frontend
```bash
npm run dev
```

## 🧪 Тестирование

Запуск всех тестов (Unit + Integration):
```bash
npm test
```

Проверка покрытия (Coverage):
```bash
npm run test:coverage
```

## 📁 Структура проекта
Проект организован по слоям (Layered Architecture):
- `components/` — атомарные и составные компоненты.
- `pages/` — компоненты страниц (контейнеры).
- `services/` — конфигурация API и RTK Query.
- `store/` — глобальное состояние.
- `hooks/` — кастомная бизнес-логика.


#### Проект успешно запускается на версии node.js 20

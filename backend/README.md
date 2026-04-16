# Popechati

Сайт проекта для печати на чем угодно (вещи, посуда, сумки и т.д.)

## Стек технологий

- Laravel 12 + Vue 3 + Tailwind CSS + Vite + Inertia.js
- Методология Atomic Design для компонентов
- TypeScript для типизации
- Vitest + Playwright для тестирования

## Основные возможности

### Система обработки ошибок

- Автоматическая обработка API, сетевых ошибок и валидации
- Уведомления с автоматическим закрытием
- Клиентская валидация форм с визуальной обратной связью
- Механизм повторных попыток (retry) для нестабильных соединений

## Запуск проекта

```bash
# Установка зависимостей
composer install
npm install

# Запуск разработки
npm run dev
```

## Тестирование

```bash
npm run test:unit    # Юнит-тесты
npm run test:e2e     # E2E тесты
npm run test:all     # Все тесты
```

## Структура проекта

```
resources/js/
├── lib/                    # Библиотеки (ошибки, валидация)
├── composables/           # Vue composables
├── Components/            # Компоненты по Atomic Design
└── Pages/                 # Страницы
```

## Документация

- [Документация системы ошибок](resources/js/lib/README.md)
- [Тестирование](TESTING.md)
- [Журнал разработки](DEVELOPMENT_LOG.md)
- [Навигация по документации](DOCS_NAVIGATION.md)

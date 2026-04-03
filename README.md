# svai12.рф — Сайт компании по установке винтовых свай

Сайт для компании, оказывающей услуги по монтажу винтовых свай в Республике Марий Эл и прилегающих регионах.

## Стек

| Инструмент | Версия |
|-----------|--------|
| Nuxt | 4.x |
| Vue | 3.x |
| TypeScript | — |
| Tailwind CSS | v4 (`@tailwindcss/vite`) |
| reka-ui | 2.x |
| pnpm | — |

## Структура проекта

```
svai12/
├── app/                    # srcDir (Nuxt 4 default)
│   ├── assets/css/         # Глобальные стили (app.css)
│   ├── components/
│   │   ├── layout/         # Header, Footer, Menu, MobileMenu
│   │   ├── sections/       # Секции страниц (Hero, HowWeWork, ContactInfo, ...)
│   │   ├── ui/             # Базовые UI-компоненты (Button, Sheet, NavigationMenu, ...)
│   │   └── icons/          # SVG-иконки
│   ├── composables/        # useErrorHandler
│   ├── layouts/            # Базовый layout
│   ├── lib/                # utils, validation, errorHandler
│   └── pages/              # index, catalog, catalog/[slug], portfolio, about, faq, reviews, contacts
├── public/
│   └── fonts/              # Шрифт Commissioner (TTF)
├── nuxt.config.ts
└── package.json
```

## Страницы

| Маршрут | Описание |
|---------|----------|
| `/` | Главная страница |
| `/catalog` | Каталог свай |
| `/catalog/:slug` | Карточка товара |
| `/portfolio` | Портфолио выполненных работ |
| `/about` | О компании |
| `/faq` | Частые вопросы |
| `/reviews` | Отзывы |
| `/contacts` | Контакты |

## Локальная разработка

```bash
# Установка зависимостей
pnpm install

# Dev-сервер на http://localhost:3000
pnpm dev
```

## Сборка

```bash
# Продакшн-сборка
pnpm build

# Превью продакшн-сборки
pnpm preview

# Статическая генерация
pnpm generate
```

## Дизайн-токены

| Токен | Значение | Класс |
|-------|---------|-------|
| Brand | `#FF8D00` | `text-brand`, `bg-brand` |
| Content primary | `#2C2C2C` | — |
| BG main | `#F7F7F7` | — |

Шрифт: **Commissioner** (локальные TTF в `public/fonts/`).

## Контакты компании

- Телефон: +7 (993) 388-13-08
- Email: svai12@inbox.ru
- Адрес: Респ. Марий Эл, г. Йошкар-Ола, ул. Красноармейская слобода, дом 44, помещ. № 2к

## Заметки

- Tailwind v4 подключён через Vite plugin в `nuxt.config.ts`, **не** через `@nuxtjs/tailwindcss`.
- CSS подключается через `app/assets/css/app.css` (не в корневом `assets/`).

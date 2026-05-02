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

## Backend для заявок

Для отправки заявок с модального окна используется отдельный минимальный Laravel backend в [backend](/home/evsedov/develop/my_dev/svai12/backend).

Frontend отправляет форму на Nuxt route `/submit-order`, а тот проксирует запрос в Laravel endpoint из переменной `NUXT_ORDERS_SUBMIT_URL`.

В Laravel уже реализованы:
- server-side валидация полей
- honeypot-поле `website`
- проверка минимального времени заполнения формы
- rate limit для `submit-order`
- ограничение типа и размера вложения
- опциональная проверка Cloudflare Turnstile
- отправка письма на `ORDERS_RECIPIENT`

## Проверка backend локально

1. Создать `.env` в корне проекта и указать адрес Laravel endpoint:

```bash
NUXT_PUBLIC_TURNSTILE_SITE_KEY=
NUXT_ORDERS_SUBMIT_URL=http://localhost:8000/submit-order
```

2. Создать `backend/.env` на основе `backend/.env.example` и заполнить SMTP для вашей тестовой почты:

```bash
APP_NAME=svai12-backend
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
FORM_MIN_FILL_MS=1500
TURNSTILE_ENABLED=false
TURNSTILE_SECRET_KEY=

LOG_CHANNEL=single
LOG_LEVEL=debug

SESSION_DRIVER=file
SESSION_LIFETIME=120

CACHE_STORE=file

QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_SCHEME=null
MAIL_HOST=...
MAIL_PORT=...
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=...
MAIL_FROM_NAME="svai12.ru"
ORDERS_RECIPIENT=your-test-email@example.com
```

3. Установить зависимости backend:

```bash
cd backend
composer install
php artisan key:generate
```

4. Запустить Laravel backend:

```bash
cd backend
php artisan serve
```

5. В отдельном терминале запустить frontend:

```bash
pnpm dev
```

6. Открыть сайт, заполнить модальное окно заказа и отправить тестовую заявку.

7. Проверить:
- письмо пришло на тестовую почту
- в письме есть все поля формы
- вложение прикрепляется корректно
- ошибки валидации показываются при пустых/некорректных полях
- слишком быстрая отправка режется сервером

## Переключение на почту клиента

После локальной проверки достаточно изменить в `backend/.env` только получателя:

```bash
ORDERS_RECIPIENT=client-email@example.com
```

После этого повторно отправить тестовую заявку и убедиться, что письмо приходит уже клиенту.

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
- Адрес: Респ. Марий Эл, г. Йошкар-Ола, ул. Красноармейская слобода, дом 44, офис 2

## Заметки

- Tailwind v4 подключён через Vite plugin в `nuxt.config.ts`, **не** через `@nuxtjs/tailwindcss`.
- CSS подключается через `app/assets/css/app.css` (не в корневом `assets/`).
- После проверки работоспособности backend можно удалить служебную папку `backend/.github`.

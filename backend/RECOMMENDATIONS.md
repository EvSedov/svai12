## Рекомендации по улучшению проекта

Текущий стек: Laravel 12 + Inertia, Vue 3 + Vite, Tailwind v4, тесты: Vitest + Playwright. Ниже — приоритизированные улучшения с конкретными шагами и примерами кода.

### P0 — критично

- CSRF и JSON-ответы для форм

    - Добавить мета-тег CSRF в макет:
        ```html
        <!-- resources/views/app.blade.php -->
        <meta name="csrf-token" content="{{ csrf_token() }}" />
        ```
    - Включить CSRF и JSON Accept в axios:
        ```js
        // resources/js/bootstrap.js
        const token = document.head.querySelector(
            'meta[name="csrf-token"]',
        ).content;
        if (token) window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
        window.axios.defaults.headers.common["Accept"] = "application/json";
        ```

- Почта: корректный адресат и постановка писем в очередь

    - В .env:
        ```env
        ORDERS_RECIPIENT=orders@example.com
        ```
    - В контроллере использовать config/env и очередь:
        ```php
        // app/Http/Controllers/OrderController.php
        Mail::to(config('mail.orders_recipient', env('ORDERS_RECIPIENT')))
            ->queue(new OrderSubmitted(...));
        ```
    - Реализовать ShouldQueue у mailable:
        ```php
        // app/Mail/OrderSubmitted.php
        use Illuminate\Contracts\Queue\ShouldQueue;
        class OrderSubmitted extends Mailable implements ShouldQueue { /* ... */ }
        ```

- Антиспам и лимиты маршрута формы

    - Ограничить частоту отправки и добавить антибот (honeypot/капча):
        ```php
        // routes/web.php
        Route::post('/submit-order', [OrderController::class, 'submitOrder'])
            ->middleware('throttle:orders');
        ```
    - В `App\Providers\RouteServiceProvider` или `RateLimiter` настроить лимит `orders` (например, 5/мин).

- Логи с персональными данными
    - Не логировать весь payload в продакшене:
        ```php
        // app/Http/Controllers/OrderController.php
        if (config('app.debug')) {
            Log::info('Received data:', $request->all());
        }
        ```

### P1 — высокий приоритет

- Локаль и часовой пояс по-умолчанию

    ```php
    // config/app.php
    'locale' => 'ru',
    'fallback_locale' => 'ru',
    'timezone' => 'Europe/Moscow',
    ```

- Flash-уведомления через Inertia

    - В контроллере:
        ```php
        return back()->with('success', 'Заказ успешно отправлен');
        ```
    - В middleware расшарить flash:
        ```php
        // app/Http/Middleware/HandleInertiaRequests.php
        public function share(Request $request): array {
            return [
                ...parent::share($request),
                'flash' => [
                    'success' => fn () => $request->session()->get('success'),
                    'error' => fn () => $request->session()->get('error'),
                ],
            ];
        }
        ```

- Удалить Laravel Mix и устаревшие зависимости

    - Удалить файл `webpack.mix.js` и зависимости `laravel-mix`, `vue-loader` из `package.json`.
    - Оставить только Vite (`vite`, `@vitejs/plugin-vue`, `laravel-vite-plugin`).

- Унифицировать TS-импорты

    - Сейчас TS-файлы импортируются как `.js`. Перейти на безрасширительный импорт или на `.ts`:
        ```diff
        - import { setupAxiosErrorInterceptor } from "./lib/errorHandler.js";
        + import { setupAxiosErrorInterceptor } from "./lib/errorHandler";
        ```
    - Аналогично: `resources/js/app.js`, `resources/js/lib/globalTestExports.ts`, юнит-тесты.

- Чистка роутера Vue
    - Проект использует Inertia; `resources/js/router/index.js` подключает несуществующие компоненты. Удалить файл или четко задокументировать его ненужность.

### P2 — средний приоритет

- Валидация через FormRequest

    - Создать `OrderSubmissionRequest` c правилами/сообщениями и использовать его в контроллере вместо `$request->validate()`.

- Тесты бэкенда

    - Feature-тесты: успешная очередь письма (`Mail::fake()` и `Mail::assertQueued()`), 422-валидация для пустых полей.

- Наблюдаемость и ошибки

    - Подключить Sentry (backend и frontend), маскировать PII, уровни логирования.

- SEO/метаданные

    - В `resources/views/app.blade.php` добавить `meta description`, OG/Twitter, canonical.

- Производительность

    - Ленивая загрузка тяжёлых компонентов, конверсия изображений в WebP/AVIF, проверка кеширования статики (Vite уже хеширует).

- Дедубликация утилит

    - Удалить дублирующий `lib/utils.ts` в корне, оставить `resources/js/lib/utils.ts`.

- Конфиг адресата заказов
    - Добавить `orders_recipient` в `config/mail.php` с возможностью переопределения через ENV и ссылкой из контроллера.

### CI/CD

- GitHub Actions (пример):
    - PHP job: `composer install`, `phpunit`.
    - Node job: `npm ci`, `npm run test:unit`.
    - E2E job: поднять `php artisan serve`, затем `npm run test:e2e` (Playwright уже содержит `webServer` конфиг).

### Краткие ссылки на места правок

- CSRF/Accept: `resources/views/app.blade.php`, `resources/js/bootstrap.js`
- Почта и очередь: `app/Http/Controllers/OrderController.php`, `app/Mail/OrderSubmitted.php`, `.env`, `config/mail.php`
- Throttle: `routes/web.php` (+ `RateLimiter`)
- Локаль/таймзона: `config/app.php`
- Flash: `app/Http/Middleware/HandleInertiaRequests.php`
- Mix cleanup: `webpack.mix.js`, `package.json`
- TS-импорты: `resources/js/app.js`, `resources/js/bootstrap.js`, `resources/js/lib/globalTestExports.ts`, `tests/Unit/*.ts`
- Vue Router: `resources/js/router/index.js`

### Следующие шаги (предлагаемый план PR)

1. P0: CSRF/Accept, адресат и очередь писем, throttle, безопасные логи.
2. P1: локаль/таймзона, flash-уведомления, удалить Mix, починить импорты TS, убрать неиспользуемый роутер.
3. P2: FormRequest + Feature-тесты, Sentry, SEO-мета, перф-оптимизации, cleanup утилит, `mail.orders_recipient`.

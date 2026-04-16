<x-mail::message>
# Новый заказ с сайта svai12.рф

Вы получили новый заказ из формы обратной связи.

**Детали заказа:**

-   **ФИО:** {{ $fullName }}
-   **Тип строения:** {{ $selectedService }}
-   **Телефон:** {{ $phoneNumber }}
-   **Адрес монтажа:** {{ $address }}
-   **Описание:** {{ $description }}
-   **Скидка:** {{ $discount }}
-   **Файл:** {{ $fileName ?: 'Не прикреплен' }}

Спасибо,<br>
{{ config('app.name') }}
</x-mail::message>

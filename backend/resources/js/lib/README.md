# Система обработки ошибок

Комплексная система для обработки ошибок, валидации форм и уведомлений пользователей.

## Компоненты системы

### 1. ErrorHandler (`errorHandler.ts`)

Основной модуль для обработки различных типов ошибок:

- API ошибки (HTTP статусы)
- Сетевые ошибки
- Ошибки валидации
- Глобальные неперехваченные ошибки

### 2. Validation (`validation.ts`)

Система валидации форм:

- Клиентская валидация полей
- Предустановленные правила
- Форматирование данных (телефон, email)

### 3. NotificationContainer (`NotificationContainer.vue`)

UI компонент для отображения уведомлений:

- Различные типы уведомлений (success, error, warning, info)
- Автоматическое закрытие
- Анимации появления/исчезновения

### 4. useErrorHandler (`useErrorHandler.ts`)

Composable для удобного использования в компонентах:

- Реактивное состояние
- Методы для показа уведомлений
- Обертка для API запросов

## Использование

### Базовое использование в компоненте

```vue
<script setup>
import { useErrorHandler } from "@/composables/useErrorHandler";

const { showError, showSuccess, withErrorHandling } = useErrorHandler();

// Показать уведомление
const handleAction = () => {
    showSuccess("Операция выполнена успешно!");
};

// Обработка API запроса
const submitForm = async () => {
    await withErrorHandling(() => axios.post("/api/submit", formData), {
        showSuccessMessage: "Форма отправлена!",
        retries: 2,
    });
};
</script>
```

### Валидация формы

```vue
<script setup>
import { validateForm, validationRules } from "@/lib/validation";

const errors = ref({});

const validateFormData = () => {
    const formErrors = validateForm(formData, {
        name: validationRules.fullName,
        phone: validationRules.phoneNumber,
        email: validationRules.email,
    });

    errors.value = formErrors;
    return Object.keys(formErrors).length === 0;
};
</script>
```

### Настройка Axios

```js
// В bootstrap.js уже настроено
import { setupAxiosErrorInterceptor } from "@/lib/errorHandler";
setupAxiosErrorInterceptor(axios);
```

## Типы уведомлений

- **success** - Успешные операции (зеленый)
- **error** - Ошибки (красный)
- **warning** - Предупреждения (желтый)
- **info** - Информационные сообщения (синий)

## Автоматические функции

- Глобальная обработка неперехваченных ошибок
- Автоматическое закрытие уведомлений
- Retry механизм для API запросов
- Форматирование номеров телефонов
- Интеграция с Inertia.js формами

## Конфигурация

Все настройки находятся в соответствующих файлах:

- Время показа уведомлений
- Правила валидации
- Сообщения об ошибках
- Стили уведомлений

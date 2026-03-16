// Типы для валидации
export interface ValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: any) => string | null;
}

export interface ValidationRules {
    [key: string]: ValidationRule;
}

export interface ValidationErrors {
    [key: string]: string;
}

// Основная функция валидации
export function validateForm(
    data: Record<string, any>,
    rules: ValidationRules,
): ValidationErrors {
    const errors: ValidationErrors = {};

    for (const [field, rule] of Object.entries(rules)) {
        const value = data[field];
        const error = validateField(value, rule);

        if (error) {
            errors[field] = error;
        }
    }

    return errors;
}

// Валидация отдельного поля
export function validateField(value: any, rule: ValidationRule): string | null {
    // Проверка обязательности
    if (
        rule.required &&
        (!value || (typeof value === "string" && value.trim() === ""))
    ) {
        return "Это поле обязательно для заполнения";
    }

    // Если поле пустое и не обязательное, пропускаем остальные проверки
    if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "")
    ) {
        return null;
    }

    // Проверка минимальной длины
    if (
        rule.minLength &&
        typeof value === "string" &&
        value.length < rule.minLength
    ) {
        return `Минимальная длина: ${rule.minLength} символов`;
    }

    // Проверка максимальной длины
    if (
        rule.maxLength &&
        typeof value === "string" &&
        value.length > rule.maxLength
    ) {
        return `Максимальная длина: ${rule.maxLength} символов`;
    }

    // Кастомная валидация (приоритетнее, чтобы возвращать точные сообщения)
    if (rule.custom) {
        const customError = rule.custom(value);
        if (customError) return customError;
    }

    // Проверка по регулярному выражению
    if (
        rule.pattern &&
        typeof value === "string" &&
        !rule.pattern.test(value)
    ) {
        return "Неверный формат данных";
    }

    return null;
}

// Предустановленные правила валидации
export const validationRules = {
    fullName: {
        required: true,
        minLength: 2,
        maxLength: 100,
        pattern: /^[а-яёА-ЯЁa-zA-Z\s-]+$/,
    },
    phoneNumber: {
        required: true,
        pattern:
            /^(\+7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/,
        custom: (value: string) => {
            const cleaned = value.replace(/[\s\-\(\)]/g, "");
            if (cleaned.length < 10 || cleaned.length > 12) {
                return "Номер телефона должен содержать 10-11 цифр";
            }
            return null;
        },
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        custom: (value: string) => {
            if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                return "Введите корректный email адрес";
            }
            return null;
        },
    },
    selectedService: {
        required: true,
    },
    quantity: {
        custom: (value: any) => {
            if (value !== null && value !== undefined && value !== "") {
                const num = Number(value);
                if (isNaN(num) || num <= 0) {
                    return "Количество должно быть положительным числом";
                }
                if (num > 10000) {
                    return "Максимальное количество: 10000";
                }
            }
            return null;
        },
    },
    description: {
        maxLength: 1000,
    },
};

// Утилита для форматирования номера телефона
export function formatPhoneNumber(value: string): string {
    const cleaned = value.replace(/\D/g, "");

    if (cleaned.length === 0) return "";

    // Нормализуем к российскому формату, приводим к +7 и форматируем прогрессивно
    let digits = cleaned;
    if (digits.startsWith("8")) digits = digits.substring(1);
    if (digits.startsWith("7")) digits = digits.substring(1);

    const prefix = "+7 ";
    // Прогрессивное форматирование по мере ввода: 3 3 2 2
    if (digits.length <= 3) {
        return prefix + digits;
    }
    if (digits.length <= 6) {
        return prefix + digits.slice(0, 3) + " " + digits.slice(3);
    }
    if (digits.length <= 8) {
        return (
            prefix +
            digits.slice(0, 3) +
            " " +
            digits.slice(3, 6) +
            "-" +
            digits.slice(6)
        );
    }
    if (digits.length <= 10) {
        return (
            prefix +
            digits.slice(0, 3) +
            " " +
            digits.slice(3, 6) +
            "-" +
            digits.slice(6, 8) +
            "-" +
            digits.slice(8)
        );
    }

    // Если слишком длинное — не форматируем
    return value;
}

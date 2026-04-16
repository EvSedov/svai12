// Экспорт функций для глобального использования в браузере
import { useGlobalErrorHandler } from "../composables/useErrorHandler.js";

// Экспортируем в глобальную область для использования в консоли браузера
if (typeof window !== "undefined") {
    window.useGlobalErrorHandler = useGlobalErrorHandler;
}

export { useGlobalErrorHandler };

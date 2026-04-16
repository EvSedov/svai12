import { ref, computed } from "vue";
import {
    errorNotificationManager,
    handleApiError,
    showErrorNotification,
    showSuccessNotification,
    showWarningNotification,
    showInfoNotification,
    type ErrorNotification,
    type ApiError,
} from "../lib/errorHandler.js";

export function useErrorHandler() {
    const notifications = ref<ErrorNotification[]>([]);
    const isLoading = ref(false);
    const lastError = ref<ApiError | null>(null);

    // Подписка на уведомления
    const unsubscribe = errorNotificationManager.subscribe(
        (newNotifications: ErrorNotification[]) => {
            notifications.value = newNotifications;
        },
    );

    // Computed свойства
    const hasErrors = computed(() =>
        notifications.value.some((n) => n.type === "error"),
    );
    const hasNotifications = computed(() => notifications.value.length > 0);

    // Методы для показа уведомлений
    const showError = (error: ApiError | string, title?: string) => {
        showErrorNotification(error, title);
    };

    const showSuccess = (message: string, title?: string) => {
        showSuccessNotification(message, title);
    };

    const showWarning = (message: string, title?: string) => {
        showWarningNotification(message, title);
    };

    const showInfo = (message: string, title?: string) => {
        showInfoNotification(message, title);
    };

    // Обертка для API запросов с обработкой ошибок
    const withErrorHandling = async <T>(
        asyncFn: () => Promise<T>,
        options?: {
            showSuccessMessage?: string;
            showErrorMessage?: boolean;
            retries?: number;
        },
    ): Promise<T | null> => {
        const {
            showSuccessMessage,
            showErrorMessage = true,
            retries = 0,
        } = options || {};

        isLoading.value = true;
        lastError.value = null;

        try {
            let result: T;

            if (retries > 0) {
                const { retryRequest } = await import("../lib/errorHandler.js");
                result = await retryRequest(asyncFn, retries);
            } else {
                result = await asyncFn();
            }

            if (showSuccessMessage) {
                showSuccess(showSuccessMessage);
            }

            return result;
        } catch (error: any) {
            const apiError = handleApiError(error);
            lastError.value = apiError;

            if (showErrorMessage) {
                showError(apiError);
            }

            return null;
        } finally {
            isLoading.value = false;
        }
    };

    // Очистка уведомлений
    const clearNotifications = () => {
        errorNotificationManager.clearAll();
    };

    const removeNotification = (id: string) => {
        errorNotificationManager.removeNotification(id);
    };

    // Cleanup функция
    const cleanup = () => {
        unsubscribe();
    };

    return {
        // Состояние
        notifications,
        isLoading,
        lastError,
        hasErrors,
        hasNotifications,

        // Методы уведомлений
        showError,
        showSuccess,
        showWarning,
        showInfo,

        // Обработка запросов
        withErrorHandling,

        // Управление уведомлениями
        clearNotifications,
        removeNotification,

        // Cleanup
        cleanup,
    };
}

// Глобальный composable для использования в любом месте приложения
let globalErrorHandler: ReturnType<typeof useErrorHandler> | null = null;

export function useGlobalErrorHandler() {
    if (!globalErrorHandler) {
        globalErrorHandler = useErrorHandler();
    }
    return globalErrorHandler;
}

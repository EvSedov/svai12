// Типы для обработки ошибок
export interface ApiError {
    message: string;
    errors?: Record<string, string[]>;
    status?: number;
}

export interface ErrorNotification {
    id: string;
    type: "error" | "warning" | "success" | "info";
    title: string;
    message: string;
    duration?: number;
}

// Класс для управления уведомлениями об ошибках
class ErrorNotificationManager {
    private notifications: ErrorNotification[] = [];
    private listeners: ((notifications: ErrorNotification[]) => void)[] = [];

    addNotification(notification: Omit<ErrorNotification, "id">): string {
        const id =
            Date.now().toString() + Math.random().toString(36).substring(2, 11);
        const newNotification: ErrorNotification = {
            ...notification,
            id,
            duration: notification.duration ?? 5000,
        };

        this.notifications.push(newNotification);
        this.notifyListeners();

        // Автоматическое удаление уведомления
        if (newNotification.duration > 0) {
            setTimeout(() => {
                this.removeNotification(id);
            }, newNotification.duration);
        }

        return id;
    }

    removeNotification(id: string): void {
        this.notifications = this.notifications.filter((n) => n.id !== id);
        this.notifyListeners();
    }

    clearAll(): void {
        this.notifications = [];
        this.notifyListeners();
    }

    subscribe(
        listener: (notifications: ErrorNotification[]) => void,
    ): () => void {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter((l) => l !== listener);
        };
    }

    private notifyListeners(): void {
        this.listeners.forEach((listener) => listener([...this.notifications]));
    }

    getNotifications(): ErrorNotification[] {
        return [...this.notifications];
    }
}

export const errorNotificationManager = new ErrorNotificationManager();

// Обработчики различных типов ошибок
export function handleApiError(error: any): ApiError {
    console.error("API Error:", error);

    // Ошибка сети
    if (!error.response) {
        return {
            message: "Ошибка сети. Проверьте подключение к интернету.",
            status: 0,
        };
    }

    const { status, data } = error.response;

    // Обработка различных HTTP статусов
    switch (status) {
        case 400:
            return {
                message: "Неверные данные запроса",
                errors: data.errors || {},
                status,
            };
        case 401:
            return {
                message: "Необходима авторизация",
                status,
            };
        case 403:
            return {
                message: "Доступ запрещен",
                status,
            };
        case 404:
            return {
                message: "Ресурс не найден",
                status,
            };
        case 422:
            return {
                message: "Ошибка валидации данных",
                errors: data.errors || {},
                status,
            };
        case 429:
            return {
                message: "Слишком много запросов. Попробуйте позже.",
                status,
            };
        case 500:
            return {
                message: "Внутренняя ошибка сервера",
                status,
            };
        case 503:
            return {
                message: "Сервис временно недоступен",
                status,
            };
        default:
            return {
                message: data.message || "Произошла неизвестная ошибка",
                errors: data.errors || {},
                status,
            };
    }
}

// Показать уведомление об ошибке
export function showErrorNotification(
    error: ApiError | string,
    title?: string,
): void {
    const message = typeof error === "string" ? error : error.message;

    errorNotificationManager.addNotification({
        type: "error",
        title: title || "Ошибка",
        message,
        duration: 5000,
    });
}

// Показать уведомление об успехе
export function showSuccessNotification(message: string, title?: string): void {
    errorNotificationManager.addNotification({
        type: "success",
        title: title || "Успешно",
        message,
        duration: 3000,
    });
}

// Показать предупреждение
export function showWarningNotification(message: string, title?: string): void {
    errorNotificationManager.addNotification({
        type: "warning",
        title: title || "Внимание",
        message,
        duration: 4000,
    });
}

// Показать информационное уведомление
export function showInfoNotification(message: string, title?: string): void {
    errorNotificationManager.addNotification({
        type: "info",
        title: title || "Информация",
        message,
        duration: 4000,
    });
}

// Обработка ошибок валидации Laravel
export function handleValidationErrors(
    errors: Record<string, string[]>,
): Record<string, string> {
    const formattedErrors: Record<string, string> = {};

    for (const [field, messages] of Object.entries(errors)) {
        formattedErrors[field] = messages[0]; // Берем первую ошибку
    }

    return formattedErrors;
}

// Глобальный обработчик неперехваченных ошибок
export function setupGlobalErrorHandler(): void {
    window.addEventListener("error", (event) => {
        let msg = null;
        if (event.error) {
            msg = event.error;
            console.error("Global error:", event.error);
        } else {
            msg = event.message;
            console.warn("Global warn:", event.message);
        }

        showErrorNotification(`Произошла неожиданная ошибка: ${msg}`);
    });

    window.addEventListener("unhandledrejection", (event) => {
        console.error("Unhandled promise rejection:", event.reason);
        showErrorNotification("Произошла ошибка при выполнении операции");
        event.preventDefault(); // Предотвращаем вывод в консоль
    });
}

// Интеграция с Axios для автоматической обработки ошибок
export function setupAxiosErrorInterceptor(axiosInstance: any): void {
    axiosInstance.interceptors.response.use(
        (response: any) => response,
        (error: any) => {
            const apiError = handleApiError(error);

            // Показываем уведомление только для серьезных ошибок
            if (apiError.status && apiError.status >= 400) {
                showErrorNotification(apiError);
            }

            return Promise.reject(apiError);
        },
    );
}

// Утилита для retry запросов
export async function retryRequest<T>(
    requestFn: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000,
): Promise<T> {
    let lastError: any;

    for (let i = 0; i <= maxRetries; i++) {
        try {
            return await requestFn();
        } catch (error) {
            lastError = error;

            if (i === maxRetries) {
                break;
            }

            // Экспоненциальная задержка
            await new Promise((resolve) =>
                setTimeout(resolve, delay * Math.pow(2, i)),
            );
        }
    }

    throw lastError;
}

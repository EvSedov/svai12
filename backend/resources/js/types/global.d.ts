// Глобальные типы для приложения

declare global {
    interface Window {
        axios: any;
        testNotifications?: () => void;
        testValidation?: () => void;
        testApiErrors?: () => void;
        runQuickTest?: () => void;
        runAllTests?: () => void;
        useGlobalErrorHandler?: () => any;
    }
}

// Типы для Inertia.js
export interface InertiaFormData {
    [key: string]: any;
}

// Типы для API ответов
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    errors?: Record<string, string[]>;
}

// Типы для пагинации
export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export {};

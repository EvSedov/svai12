import { describe, it, expect, beforeEach, vi } from "vitest";
import {
    handleApiError,
    errorNotificationManager,
    showErrorNotification,
    showSuccessNotification,
    handleValidationErrors,
} from "../../resources/js/lib/errorHandler.js";

// Mock console methods
vi.mock("console", () => ({
    error: vi.fn(),
    log: vi.fn(),
}));

describe("Error Handler System", () => {
    beforeEach(() => {
        // Очищаем уведомления перед каждым тестом
        errorNotificationManager.clearAll();
    });

    describe("handleApiError", () => {
        it("should handle network errors", () => {
            const networkError = { response: null };
            const result = handleApiError(networkError);

            expect(result.message).toBe(
                "Ошибка сети. Проверьте подключение к интернету.",
            );
            expect(result.status).toBe(0);
        });

        it("should handle 400 Bad Request", () => {
            const error = {
                response: {
                    status: 400,
                    data: { errors: { field: ["Error message"] } },
                },
            };

            const result = handleApiError(error);

            expect(result.message).toBe("Неверные данные запроса");
            expect(result.status).toBe(400);
            expect(result.errors).toEqual({ field: ["Error message"] });
        });

        it("should handle 401 Unauthorized", () => {
            const error = {
                response: {
                    status: 401,
                    data: {},
                },
            };

            const result = handleApiError(error);

            expect(result.message).toBe("Необходима авторизация");
            expect(result.status).toBe(401);
        });

        it("should handle 422 Validation Error", () => {
            const error = {
                response: {
                    status: 422,
                    data: {
                        errors: {
                            email: ["Email is required"],
                            name: ["Name is too short"],
                        },
                    },
                },
            };

            const result = handleApiError(error);

            expect(result.message).toBe("Ошибка валидации данных");
            expect(result.status).toBe(422);
            expect(result.errors).toEqual({
                email: ["Email is required"],
                name: ["Name is too short"],
            });
        });

        it("should handle 500 Internal Server Error", () => {
            const error = {
                response: {
                    status: 500,
                    data: {},
                },
            };

            const result = handleApiError(error);

            expect(result.message).toBe("Внутренняя ошибка сервера");
            expect(result.status).toBe(500);
        });

        it("should handle unknown errors", () => {
            const error = {
                response: {
                    status: 999,
                    data: { message: "Custom error message" },
                },
            };

            const result = handleApiError(error);

            expect(result.message).toBe("Custom error message");
            expect(result.status).toBe(999);
        });
    });

    describe("ErrorNotificationManager", () => {
        it("should add notifications", () => {
            const notification = {
                type: "success" as const,
                title: "Test",
                message: "Test message",
            };

            const id = errorNotificationManager.addNotification(notification);
            const notifications = errorNotificationManager.getNotifications();

            expect(notifications).toHaveLength(1);
            expect(notifications[0].id).toBe(id);
            expect(notifications[0].type).toBe("success");
            expect(notifications[0].title).toBe("Test");
            expect(notifications[0].message).toBe("Test message");
        });

        it("should remove notifications", () => {
            const notification = {
                type: "error" as const,
                title: "Test",
                message: "Test message",
            };

            const id = errorNotificationManager.addNotification(notification);
            expect(errorNotificationManager.getNotifications()).toHaveLength(1);

            errorNotificationManager.removeNotification(id);
            expect(errorNotificationManager.getNotifications()).toHaveLength(0);
        });

        it("should clear all notifications", () => {
            errorNotificationManager.addNotification({
                type: "success",
                title: "Test 1",
                message: "Message 1",
            });

            errorNotificationManager.addNotification({
                type: "error",
                title: "Test 2",
                message: "Message 2",
            });

            expect(errorNotificationManager.getNotifications()).toHaveLength(2);

            errorNotificationManager.clearAll();
            expect(errorNotificationManager.getNotifications()).toHaveLength(0);
        });

        it("should notify subscribers", () => {
            const mockListener = vi.fn();
            const unsubscribe =
                errorNotificationManager.subscribe(mockListener);

            errorNotificationManager.addNotification({
                type: "info",
                title: "Test",
                message: "Test message",
            });

            expect(mockListener).toHaveBeenCalledTimes(1);
            expect(mockListener).toHaveBeenCalledWith(
                expect.arrayContaining([
                    expect.objectContaining({
                        type: "info",
                        title: "Test",
                        message: "Test message",
                    }),
                ]),
            );

            unsubscribe();
        });

        it("should auto-remove notifications after duration", (done) => {
            const notification = {
                type: "warning" as const,
                title: "Test",
                message: "Test message",
                duration: 100, // 100ms for testing
            };

            errorNotificationManager.addNotification(notification);
            expect(errorNotificationManager.getNotifications()).toHaveLength(1);

            setTimeout(() => {
                expect(
                    errorNotificationManager.getNotifications(),
                ).toHaveLength(0);
                done();
            }, 150);
        });
    });

    describe("notification helpers", () => {
        it("should show error notification", () => {
            showErrorNotification("Test error");
            const notifications = errorNotificationManager.getNotifications();

            expect(notifications).toHaveLength(1);
            expect(notifications[0].type).toBe("error");
            expect(notifications[0].title).toBe("Ошибка");
            expect(notifications[0].message).toBe("Test error");
        });

        it("should show success notification", () => {
            showSuccessNotification("Test success", "Custom Title");
            const notifications = errorNotificationManager.getNotifications();

            expect(notifications).toHaveLength(1);
            expect(notifications[0].type).toBe("success");
            expect(notifications[0].title).toBe("Custom Title");
            expect(notifications[0].message).toBe("Test success");
        });

        it("should handle API error objects", () => {
            const apiError = {
                message: "API Error",
                status: 400,
                errors: { field: ["Field error"] },
            };

            showErrorNotification(apiError);
            const notifications = errorNotificationManager.getNotifications();

            expect(notifications).toHaveLength(1);
            expect(notifications[0].message).toBe("API Error");
        });
    });

    describe("handleValidationErrors", () => {
        it("should format Laravel validation errors", () => {
            const laravelErrors = {
                email: ["Email is required", "Email must be valid"],
                name: ["Name is required"],
                phone: ["Phone number is invalid"],
            };

            const formatted = handleValidationErrors(laravelErrors);

            expect(formatted).toEqual({
                email: "Email is required",
                name: "Name is required",
                phone: "Phone number is invalid",
            });
        });

        it("should handle empty errors object", () => {
            const formatted = handleValidationErrors({});
            expect(formatted).toEqual({});
        });
    });
});

import { describe, it, expect } from "vitest";
import {
    validateField,
    validateForm,
    validationRules,
    formatPhoneNumber,
} from "../../resources/js/lib/validation.js";

describe("Validation System", () => {
    describe("validateField", () => {
        it("should validate required fields", () => {
            const rule = { required: true };

            expect(validateField("", rule)).toBe(
                "Это поле обязательно для заполнения",
            );
            expect(validateField("   ", rule)).toBe(
                "Это поле обязательно для заполнения",
            );
            expect(validateField("test", rule)).toBeNull();
        });

        it("should validate minimum length", () => {
            const rule = { minLength: 3 };

            expect(validateField("ab", rule)).toBe(
                "Минимальная длина: 3 символов",
            );
            expect(validateField("abc", rule)).toBeNull();
            expect(validateField("abcd", rule)).toBeNull();
        });

        it("should validate maximum length", () => {
            const rule = { maxLength: 5 };

            expect(validateField("abcdef", rule)).toBe(
                "Максимальная длина: 5 символов",
            );
            expect(validateField("abcde", rule)).toBeNull();
            expect(validateField("abc", rule)).toBeNull();
        });

        it("should validate patterns", () => {
            const rule = { pattern: /^[a-zA-Z]+$/ };

            expect(validateField("123", rule)).toBe("Неверный формат данных");
            expect(validateField("abc123", rule)).toBe(
                "Неверный формат данных",
            );
            expect(validateField("abc", rule)).toBeNull();
        });

        it("should use custom validation", () => {
            const rule = {
                custom: (value: string) =>
                    value === "test" ? null : 'Должно быть "test"',
            };

            expect(validateField("wrong", rule)).toBe('Должно быть "test"');
            expect(validateField("test", rule)).toBeNull();
        });
    });

    describe("validateForm", () => {
        it("should validate entire form", () => {
            const data = {
                name: "",
                email: "invalid-email",
                phone: "123",
            };

            const rules = {
                name: { required: true },
                email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
                phone: { minLength: 10 },
            };

            const errors = validateForm(data, rules);

            expect(errors.name).toBe("Это поле обязательно для заполнения");
            expect(errors.email).toBe("Неверный формат данных");
            expect(errors.phone).toBe("Минимальная длина: 10 символов");
        });

        it("should return empty object for valid form", () => {
            const data = {
                name: "John Doe",
                email: "john@example.com",
                phone: "1234567890",
            };

            const rules = {
                name: { required: true, minLength: 2 },
                email: { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
                phone: { minLength: 10 },
            };

            const errors = validateForm(data, rules);
            expect(Object.keys(errors)).toHaveLength(0);
        });
    });

    describe("formatPhoneNumber", () => {
        it("should format Russian phone numbers", () => {
            expect(formatPhoneNumber("89123456789")).toBe("+7 912 345-67-89");
            expect(formatPhoneNumber("79123456789")).toBe("+7 912 345-67-89");
            expect(formatPhoneNumber("9123456789")).toBe("+7 912 345-67-89");
        });

        it("should handle partial numbers", () => {
            expect(formatPhoneNumber("891234")).toBe("+7 912 34");
            expect(formatPhoneNumber("8")).toBe("+7 ");
        });

        it("should handle empty input", () => {
            expect(formatPhoneNumber("")).toBe("");
        });

        it("should preserve invalid long numbers", () => {
            const longNumber = "891234567890123";
            expect(formatPhoneNumber(longNumber)).toBe(longNumber);
        });
    });

    describe("predefined validation rules", () => {
        it("should validate full name", () => {
            const rule = validationRules.fullName;

            expect(validateField("", rule)).toBe(
                "Это поле обязательно для заполнения",
            );
            expect(validateField("A", rule)).toBe(
                "Минимальная длина: 2 символов",
            );
            expect(validateField("123", rule)).toBe("Неверный формат данных");
            expect(validateField("Иван Петров", rule)).toBeNull();
            expect(validateField("John Doe", rule)).toBeNull();
        });

        it("should validate phone number", () => {
            const rule = validationRules.phoneNumber;

            expect(validateField("", rule)).toBe(
                "Это поле обязательно для заполнения",
            );
            expect(validateField("123", rule)).toBe(
                "Номер телефона должен содержать 10-11 цифр",
            );
            expect(validateField("+7 912 345-67-89", rule)).toBeNull();
        });

        it("should validate email", () => {
            const rule = validationRules.email;

            expect(validateField("invalid-email", rule)).toBe(
                "Введите корректный email адрес",
            );
            expect(validateField("test@example.com", rule)).toBeNull();
            expect(validateField("", rule)).toBeNull(); // email не обязательный
        });

        it("should validate quantity", () => {
            const rule = validationRules.quantity;

            expect(validateField(-1, rule)).toBe(
                "Количество должно быть положительным числом",
            );
            expect(validateField(0, rule)).toBe(
                "Количество должно быть положительным числом",
            );
            expect(validateField(10001, rule)).toBe(
                "Максимальное количество: 10000",
            );
            expect(validateField(100, rule)).toBeNull();
            expect(validateField(null, rule)).toBeNull(); // quantity не обязательный
        });
    });
});

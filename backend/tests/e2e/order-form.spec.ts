import { test, expect } from "@playwright/test";

test.describe("Order Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
    });

    test("should open order modal", async ({ page }) => {
        // Найти и кликнуть кнопку заказа
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Проверить, что модальное окно открылось
        const modal = page.locator('[class*="modal"], [role="dialog"]');
        await expect(modal).toBeVisible();

        // Проверить заголовок модального окна
        await expect(
            page.locator("h2", { hasText: "Сделать заказ" }),
        ).toBeVisible();
    });

    test("should show validation errors for empty form", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Попытаться отправить пустую форму
        const submitButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .last();
        await submitButton.click();

        // Проверить, что появились ошибки валидации
        await expect(
            page.locator("text=Это поле обязательно для заполнения"),
        ).toBeVisible();

        // Проверить красные рамки у полей
        const nameInput = page.locator('input[placeholder*="ФИО"]');
        await expect(nameInput).toHaveClass(/ring-red-500/);
    });

    test("should validate phone number format", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Ввести неправильный номер телефона
        const phoneInput = page.locator('input[placeholder*="телефон"]');
        await phoneInput.fill("123");

        // Попытаться отправить форму
        const submitButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .last();
        await submitButton.click();

        // Проверить ошибку валидации телефона
        await expect(
            page.locator("text=Номер телефона должен содержать 10-11 цифр"),
        ).toBeVisible();
    });

    test("should format phone number on input", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Ввести номер телефона
        const phoneInput = page.locator('input[placeholder*="телефон"]');
        await phoneInput.fill("89123456789");

        // Проверить, что номер отформатировался
        await expect(phoneInput).toHaveValue("+7 912 345-67-89");
    });

    test("should show progress bar based on filled fields", async ({
        page,
    }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Проверить начальное состояние прогресс-бара (0%)
        const progressText = page.locator("text=0%");
        await expect(progressText).toBeVisible();

        // Заполнить имя
        const nameInput = page.locator('input[placeholder*="ФИО"]');
        await nameInput.fill("Иван Петров");

        // Проверить, что прогресс увеличился (2%)
        await expect(page.locator("text=2%")).toBeVisible();

        // Заполнить услугу
        const serviceInput = page.locator('input[placeholder*="услуги"]');
        await serviceInput.fill("Печать визиток");

        // Проверить прогресс (4%)
        await expect(page.locator("text=4%")).toBeVisible();
    });

    test("should require agreement checkbox", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Заполнить обязательные поля
        await page.locator('input[placeholder*="ФИО"]').fill("Иван Петров");
        await page
            .locator('input[placeholder*="услуги"]')
            .fill("Печать визиток");
        await page.locator('input[placeholder*="телефон"]').fill("89123456789");

        // Попытаться отправить без согласия
        const submitButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .last();
        await submitButton.click();

        // Проверить, что кнопка заблокирована или показана ошибка
        await expect(submitButton).toBeDisabled();
    });

    test("should submit valid form successfully", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Заполнить все обязательные поля
        await page.locator('input[placeholder*="ФИО"]').fill("Иван Петров");
        await page
            .locator('input[placeholder*="услуги"]')
            .fill("Печать визиток");
        await page.locator('input[placeholder*="телефон"]').fill("89123456789");
        await page
            .locator('textarea[placeholder*="описание"]')
            .fill("Нужны визитки для офиса");
        await page.locator('input[type="number"]').fill("100");

        // Поставить галочку согласия
        const agreementCheckbox = page.locator('input[type="checkbox"]');
        await agreementCheckbox.check();

        // Отправить форму
        const submitButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .last();
        await submitButton.click();

        // Проверить, что появилось уведомление об успехе
        await expect(
            page.locator("text=Заказ успешно отправлен"),
        ).toBeVisible();

        // Проверить, что модальное окно закрылось
        const modal = page.locator('[class*="modal"], [role="dialog"]');
        await expect(modal).not.toBeVisible();
    });

    test("should show loading state during submission", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Заполнить форму
        await page.locator('input[placeholder*="ФИО"]').fill("Иван Петров");
        await page
            .locator('input[placeholder*="услуги"]')
            .fill("Печать визиток");
        await page.locator('input[placeholder*="телефон"]').fill("89123456789");
        await page.locator('input[type="checkbox"]').check();

        // Отправить форму
        const submitButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .last();
        await submitButton.click();

        // Проверить состояние загрузки
        await expect(page.locator("text=Отправка...")).toBeVisible();
        await expect(page.locator(".animate-spin")).toBeVisible();
    });

    test("should close modal on close button click", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Найти и кликнуть кнопку закрытия
        const closeButton = page
            .locator('button svg[stroke="currentColor"]')
            .first();
        await closeButton.click();

        // Проверить, что модальное окно закрылось
        const modal = page.locator('[class*="modal"], [role="dialog"]');
        await expect(modal).not.toBeVisible();
    });

    test("should close modal on backdrop click", async ({ page }) => {
        // Открыть модальное окно
        const orderButton = page
            .locator("button", { hasText: "Сделать заказ" })
            .first();
        await orderButton.click();

        // Кликнуть на фон (backdrop)
        const backdrop = page.locator('[class*="bg-black/50"]');
        await backdrop.click({ position: { x: 10, y: 10 } });

        // Проверить, что модальное окно закрылось
        const modal = page.locator('[class*="modal"], [role="dialog"]');
        await expect(modal).not.toBeVisible();
    });
});

// Скрипт для тестирования системы обработки ошибок
// Вставляйте команды по одной в консоль браузера

console.log("🧪 Система тестирования ошибок загружена");
console.log("📋 Доступные команды:");
console.log("  testNotifications() - тест уведомлений");
console.log("  testValidation() - тест валидации");
console.log("  testApiErrors() - тест API ошибок");
console.log("  runQuickTest() - быстрый тест");
console.log("");

// Функция для тестирования уведомлений
function testNotifications() {
    console.log("📢 Тестируем уведомления...");

    // Импортируем функции (если доступны глобально)
    try {
        const { showSuccess, showError, showWarning, showInfo } =
            window.useGlobalErrorHandler?.() || {};

        if (showSuccess) {
            showSuccess("✅ Тест успешного уведомления!");
            setTimeout(() => showError("❌ Тест ошибки!"), 1500);
            setTimeout(() => showWarning("⚠️ Тест предупреждения!"), 3000);
            setTimeout(() => showInfo("ℹ️ Тест информации!"), 4500);

            console.log("✅ Уведомления запущены");
        } else {
            console.log("❌ Функции уведомлений не найдены");
        }
    } catch (error) {
        console.error("❌ Ошибка при тестировании уведомлений:", error);
    }
}

// Функция для тестирования валидации
function testValidation() {
    console.log("🔍 Тестируем валидацию...");

    // Найдем модальное окно заказа
    const orderButton =
        document.querySelector('button:contains("Сделать заказ")') ||
        document.querySelector('[class*="order"]') ||
        document.querySelector("button");

    if (orderButton) {
        console.log("🎯 Найдена кнопка заказа, кликаем...");
        orderButton.click();

        setTimeout(() => {
            const submitButton = document.querySelector(
                'button:contains("Сделать заказ")',
            );
            if (submitButton) {
                console.log("📝 Пробуем отправить пустую форму...");
                submitButton.click();
            }
        }, 1000);
    } else {
        console.log("❌ Кнопка заказа не найдена");
    }
}

// Функция для тестирования обработки ошибок API
function testApiErrors() {
    console.log("🌐 Тестируем обработку API ошибок...");

    // Тестируем различные типы ошибок
    const testUrls = [
        "/api/test-404", // 404 ошибка
        "/api/test-500", // 500 ошибка
        "/api/test-422", // 422 валидация
    ];

    testUrls.forEach((url, index) => {
        setTimeout(() => {
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        console.log(
                            `📡 Получена ошибка ${response.status} для ${url}`,
                        );
                    }
                })
                .catch((error) => {
                    console.log(`🔌 Сетевая ошибка для ${url}:`, error.message);
                });
        }, index * 1000);
    });
}

// Главная функция тестирования
function runAllTests() {
    console.log("🚀 Запускаем все тесты...");

    testNotifications();

    setTimeout(() => {
        testValidation();
    }, 2000);

    setTimeout(() => {
        testApiErrors();
    }, 4000);

    console.log(
        "⏱️ Тесты запущены, результаты будут через несколько секунд...",
    );
}

// Экспортируем функции в глобальную область
window.testErrorSystem = {
    runAllTests,
    testNotifications,
    testValidation,
    testApiErrors,
};

console.log("Тестовые функции готовы!");
console.log("📋 Доступные команды:");
console.log("   testErrorSystem.runAllTests() - запустить все тесты");
console.log("   testErrorSystem.testNotifications() - тест уведомлений");
console.log("   testErrorSystem.testValidation() - тест валидации");
console.log("   testErrorSystem.testApiErrors() - тест API ошибок");
console.log("");
console.log("🎯 Для быстрого теста выполните: testErrorSystem.runAllTests()");
og;

// Быстрый тест основных функций
function runQuickTest() {
    console.log("🚀 Быстрый тест системы...");

    // Тест 1: Создание тестового уведомления
    const testDiv = document.createElement("div");
    testDiv.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 9999;
        background: #10B981; color: white; padding: 15px 20px;
        border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        font-family: Arial, sans-serif;
    `;
    testDiv.innerHTML = "✅ Тест уведомления работает!";
    document.body.appendChild(testDiv);

    setTimeout(() => testDiv.remove(), 3000);
    console.log("✅ Тест уведомления запущен");

    // Тест 2: Проверка модального окна
    const orderButton = document.querySelector("button");
    if (orderButton) {
        console.log("✅ Найдена кнопка для тестирования");
    } else {
        console.log("❌ Кнопки не найдены");
    }

    // Тест 3: Проверка системы ошибок
    try {
        if (window.axios) {
            console.log("✅ Axios загружен");
        } else {
            console.log("❌ Axios не найден");
        }
    } catch (e) {
        console.log("❌ Ошибка при проверке Axios:", e.message);
    }

    console.log("🎯 Быстрый тест завершен");
}

// Экспорт функций
window.testNotifications = testNotifications;
window.testValidation = testValidation;
window.testApiErrors = testApiErrors;
window.runQuickTest = runQuickTest;
window.runAllTests = runAllTests;

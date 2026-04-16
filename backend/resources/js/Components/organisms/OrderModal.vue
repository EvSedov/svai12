<script setup lang="ts">
import { watch, onUnmounted, computed, ref } from "vue";
import { useForm } from "@inertiajs/vue3";
import { useErrorHandler } from "../../composables/useErrorHandler.js";
import {
    validateForm,
    validationRules,
    formatPhoneNumber,
} from "../../lib/validation.js";

// Change isOpen to a prop, using modelValue for v-model compatibility
const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

// Define emits for updating the prop
const emit = defineEmits(["update:modelValue"]);

// Инициализация обработчика ошибок
const { showError, showSuccess, isLoading } = useErrorHandler();

// Состояние валидации
const validationErrors = ref<Record<string, string>>({});

const closeModal = () => {
    // Очищаем форму и ошибки при закрытии
    form.reset();
    validationErrors.value = {};
    emit("update:modelValue", false);
};

// Изменено: Создание экземпляра form с использованием useForm
const form = useForm({
    fullName: "",
    selectedService: "",
    phoneNumber: "",
    description: "",
    quantity: null, // Количество тоже может быть в форме
    agree: false, // Согласие также может быть частью формы
    discount: 0,
});

// const serviceOptions = [
//     { value: "business-cards", label: "Печать визиток" },
//     {
//         value: "sheet-printing",
//         label: "Листовая полиграфия",
//     },
//     {
//         value: "multi-page-printing",
//         label: "Многостраничная полиграфия",
//     },
//     { value: "stickers", label: "Печать наклеек" },
//     {
//         value: "acrylic-printing",
//         label: "Печать на акриле",
//     },
//     { value: "packaging", label: "Печать на упаковке" },
//     {
//         value: "bags-and-packages",
//         label: "Печать на пакетах и сумках",
//     },
//     {
//         value: "wrapping-paper",
//         label: "Печать на упаковочной бумаге",
//     },
//     {
//         value: "offset-printing",
//         label: "Офсетная печать",
//     },
//     {
//         value: "corporate-merch",
//         label: "Печать корпоративного мерча",
//     },
//     { value: "souvenirs", label: "Печать сувениров" },
//     {
//         value: "interior-printing",
//         label: "Интерьерная печать",
//     },
//     {
//         value: "wide-format-printing",
//         label: "Широкоформатная печать",
//     },
//     { value: "calendars", label: "Печать календарей" },
//     { value: "clothing", label: "Печать на одежде" },
//     {
//         value: "stands-press-roll-up",
//         label: "Печать стендов Press wall, Roll Up",
//     },
//     { value: "cards", label: "Печать открыток" },
//     { value: "invitations", label: "Печать приглашений" },
//     { value: "flyers", label: "Печать листовок" },
//     { value: "posters", label: "Печать плакатов" },
//     { value: "tickets", label: "Печать билетов" },
//     { value: "certificates", label: "Печать сертификатов" },
//     { value: "diplomas", label: "Печать дипломов" },
//     { value: "brochures", label: "Печать буклетов" },
//     { value: "envelopes", label: "Печать конвертов" },
//     { value: "bookmarks", label: "Печать закладок" },
// ];

// Вычисляемое свойство для расчета количества заполненных полей
const completedFieldsCount = computed(() => {
    let count = 0;
    if (form.fullName.trim() !== "") {
        count++;
    }
    if (form.selectedService !== "") {
        count++;
    }
    if (form.phoneNumber.trim() !== "") {
        count++;
    }
    if (form.description.trim() !== "") {
        count++;
    }
    if (form.quantity !== null && form.quantity > 0) {
        count++;
    }
    return count;
});

// Вычисляемое свойство для отображения процента скидки (0-10%)
const discountPercentage = computed(() => {
    return completedFieldsCount.value * 2;
});

// Вычисляемое свойство для ширины прогресс-бара (0-100%)
const progressBarWidth = computed(() => {
    // Каждое заполненное поле дает 25% ширины прогресс-бара
    return completedFieldsCount.value * 20;
});

// Валидация формы
const validateFormData = () => {
    const formData = {
        fullName: form.fullName,
        selectedService: form.selectedService,
        phoneNumber: form.phoneNumber,
        description: form.description,
        quantity: form.quantity,
    };

    const rules = {
        fullName: validationRules.fullName,
        selectedService: validationRules.selectedService,
        phoneNumber: validationRules.phoneNumber,
        description: validationRules.description,
        quantity: validationRules.quantity,
    };

    const errors = validateForm(formData, rules);
    validationErrors.value = errors;

    return Object.keys(errors).length === 0;
};

// Форматирование номера телефона при вводе
const handlePhoneInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const formatted = formatPhoneNumber(target.value);
    form.phoneNumber = formatted;
};

// Функция для обработки отправки заказа
const handleSubmitOrder = async () => {
    // Проверяем согласие
    if (!form.agree) {
        showError("Необходимо принять условия передачи информации");
        return;
    }

    // Валидируем форму
    if (!validateFormData()) {
        showError("Пожалуйста, исправьте ошибки в форме");
        return;
    }

    // Устанавливаем скидку
    form.discount = discountPercentage.value;

    // Отправляем форму
    form.post("/submit-order", {
        onSuccess: () => {
            showSuccess(
                "Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.",
            );
            closeModal();
        },
        onError: (errors) => {
            console.error("Ошибка отправки формы:", errors);

            // Обрабатываем ошибки валидации от сервера
            if (errors) {
                validationErrors.value = errors;
                showError("Пожалуйста, исправьте ошибки в форме");
            } else {
                showError(
                    "Произошла ошибка при отправке заказа. Попробуйте еще раз.",
                );
            }
        },
    });
};

watch(
    () => props.modelValue,
    (newValue) => {
        if (newValue) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    },
    { immediate: true },
);

onUnmounted(() => {
    document.body.style.overflow = "";
});
</script>

<template>
    <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeModal"
    >
        <!-- Modal Content -->
        <div
            class="flex max-h-[calc(100vh-2rem)] w-full max-w-[1104px] flex-col rounded-3xl bg-white shadow-lg"
        >
            <!-- Modal Header -->
            <div
                class="flex flex-shrink-0 items-center justify-between px-4 py-4 md:px-8 md:py-8 lg:py-12 lg:pl-16 xl:py-[64px] xl:pl-[140px]"
            >
                <h2
                    class="text-[24px] leading-[1.16em] font-bold text-black sm:text-[32px]"
                >
                    Сделать заказ
                </h2>
                <!-- Close button -->
                <button
                    @click="closeModal"
                    class="flex-shrink-0 p-2 text-black hover:scale-120 hover:font-black hover:text-gray-700"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-8 w-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <!--Container for Left and Right Columns, makes the entire modal content area grow vertically -->
            <div class="flex min-h-0 flex-grow flex-col lg:flex-row-reverse">
                <!-- Right Column (Progress Bar) -->
                <div
                    class="w-full flex-shrink-0 px-4 py-4 md:px-8 lg:w-1/3 lg:min-w-[248px] lg:pt-[64px] lg:pr-16 lg:pl-6 xl:pr-[140px]"
                >
                    <div class="mb-4">
                        <h3
                            class="text-[14px] leading-[1.42em] font-normal text-[#0000008A]"
                        >
                            Шкала заполнения формы:
                        </h3>
                        <p
                            class="text-[21px] leading-[1.33em] font-normal text-[#000000CC]"
                        >
                            {{ discountPercentage }}%
                        </p>
                    </div>
                    <!-- Progress Bar -->
                    <div
                        class="mb-2 h-2 w-full max-w-51 rounded-md bg-[#F6F7F8]"
                    >
                        <div
                            class="h-2 rounded-md bg-[#1882F0]"
                            :style="{ width: progressBarWidth + '%' }"
                        ></div>
                    </div>
                    <p
                        class="text-[14px] leading-[1.42em] font-normal text-[#0000008A]"
                    >
                        +2% за каждый пункт
                    </p>
                </div>

                <!-- Left Column (Form and Footer) -->
                <div
                    class="flex min-h-0 w-full flex-grow flex-col px-4 py-4 md:px-8 md:py-8 lg:w-2/3 lg:py-12 lg:pl-16 xl:py-[64px] xl:pl-[140px]"
                >
                    <!-- Modal Body (Form) - This is the main scrollable area -->
                    <div
                        class="flex min-h-0 flex-grow flex-col gap-6 overflow-y-auto px-2.5 pb-8"
                    >
                        <!-- "Как к вам обращаться?" Section -->
                        <div>
                            <h3
                                class="mb-5 text-[21px] leading-[1.33em] font-normal text-[#000000CC]"
                            >
                                Как к вам обращаться?
                            </h3>
                            <input
                                type="text"
                                placeholder="Введите ФИО*"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-[16px] leading-[1.5em] text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
                                    validationErrors.fullName
                                        ? 'ring-2 ring-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500',
                                ]"
                                v-model="form.fullName"
                            />
                            <p
                                v-if="validationErrors.fullName"
                                class="mt-1 text-sm text-red-500"
                            >
                                {{ validationErrors.fullName }}
                            </p>
                        </div>

                        <!-- "Выберите услугу" Section -->
                        <div>
                            <h3
                                class="mb-5 text-[21px] leading-[1.33em] font-normal text-[#000000CC]"
                            >
                                Укажите услугу
                            </h3>

                            <input
                                type="text"
                                placeholder="Какой тип услуги Вам нужен?"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-[16px] leading-[1.5em] text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
                                    validationErrors.selectedService
                                        ? 'ring-2 ring-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500',
                                ]"
                                v-model="form.selectedService"
                            />
                            <p
                                v-if="validationErrors.selectedService"
                                class="mt-1 text-sm text-red-500"
                            >
                                {{ validationErrors.selectedService }}
                            </p>
                        </div>

                        <!-- "Контактные данные" Section -->
                        <div>
                            <h3
                                class="mb-5 text-[21px] leading-[1.33em] font-normal text-[#000000CC]"
                            >
                                Контактные данные
                            </h3>
                            <input
                                type="tel"
                                placeholder="Введите номер телефона*"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-[16px] leading-[1.5em] text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
                                    validationErrors.phoneNumber
                                        ? 'ring-2 ring-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500',
                                ]"
                                v-model="form.phoneNumber"
                                @input="handlePhoneInput"
                            />
                            <p
                                v-if="validationErrors.phoneNumber"
                                class="mt-1 text-sm text-red-500"
                            >
                                {{ validationErrors.phoneNumber }}
                            </p>
                        </div>

                        <!-- "Описание" Section -->
                        <div>
                            <h3
                                class="mb-5 text-[21px] leading-[1.33em] font-normal text-[#000000CC]"
                            >
                                Описание
                            </h3>
                            <textarea
                                placeholder="Введите описание"
                                :class="[
                                    'h-32 w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-[16px] leading-[1.5em] text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
                                    validationErrors.description
                                        ? 'ring-2 ring-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500',
                                ]"
                                v-model="form.description"
                            ></textarea>
                            <p
                                v-if="validationErrors.description"
                                class="mt-1 text-sm text-red-500"
                            >
                                {{ validationErrors.description }}
                            </p>
                        </div>

                        <div>
                            <h3
                                class="mb-5 text-[21px] leading-[1.33em] font-normal text-[#000000CC]"
                            >
                                Количество единиц
                            </h3>
                            <input
                                type="number"
                                placeholder="Введите количество"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-[16px] leading-[1.5em] text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
                                    validationErrors.quantity
                                        ? 'ring-2 ring-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500',
                                ]"
                                v-model.number="form.quantity"
                                min="1"
                            />
                            <p
                                v-if="validationErrors.quantity"
                                class="mt-1 text-sm text-red-500"
                            >
                                {{ validationErrors.quantity }}
                            </p>
                        </div>
                    </div>

                    <!-- Footer section with agreement and button - flex-shrink-0 to prevent it from shrinking -->
                    <div
                        class="flex flex-shrink-0 flex-col items-start justify-between gap-4 pt-8 md:flex-row md:items-center"
                    >
                        <!-- Agreement Checkbox -->
                        <div class="flex w-full items-start md:w-2/3">
                            <!-- Adjust width as needed -->
                            <input
                                type="checkbox"
                                id="agreement"
                                class="mt-1 mr-2 flex-shrink-0"
                                v-model="form.agree"
                            />
                            <label
                                for="agreement"
                                class="text-[13px] leading-[1.53em] font-normal text-[rgba(0,0,0,0.4)]"
                            >
                                Заполняя форму, я принимаю
                                <a
                                    href="/docs/Оферта.pdf"
                                    download="Оферта.pdf"
                                    target="_blank"
                                    class="text-[#126DF7]"
                                >
                                    условия передачи информации
                                </a>
                                и даю
                                <a
                                    href="/docs/Соглашение.pdf"
                                    download="Соглашение.pdf"
                                    target="_blank"
                                    class="text-[#126DF7]"
                                >
                                    согласие
                                </a>
                                на получение информации о продуктах от
                                <span class="font-bold">popechati.com</span>
                            </label>
                        </div>

                        <!-- Modal Footer (Submit button) -->
                        <div class="w-full flex-shrink-0 md:w-auto">
                            <!-- Prevent button from shrinking -->
                            <button
                                :class="[
                                    'rounded-xl px-8 py-4 text-[16px] leading-[1.25em] font-medium text-white transition-all duration-200',
                                    !form.agree || isLoading
                                        ? 'cursor-not-allowed bg-gray-400 opacity-50'
                                        : 'bg-[#1882F0] hover:bg-blue-600',
                                ]"
                                :disabled="!form.agree || isLoading"
                                @click="handleSubmitOrder"
                            >
                                <span
                                    v-if="isLoading"
                                    class="flex items-center"
                                >
                                    <svg
                                        class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            class="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            stroke-width="4"
                                        ></circle>
                                        <path
                                            class="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Отправка...
                                </span>
                                <span v-else>Сделать заказ</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.btnDisabled {
    opacity: 0.5;
    cursor: not-allowed;
}
/* Add any component-specific styles here if needed, though Tailwind should cover most */
</style>

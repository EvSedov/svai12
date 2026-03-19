<script setup lang="ts">
const assetPath = usePublicAsset();

import { watch, onUnmounted, computed, ref, reactive } from "vue";
import { useErrorHandler } from "@/composables/useErrorHandler";
import {
    validateForm,
    validationRules,
    formatPhoneNumber,
} from "@/lib/validation";

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

const form = reactive({
    fullName: "",
    selectedService: "",
    phoneNumber: "",
    description: "",
    quantity: null as number | null,
    agree: false,
    discount: 0,
});

const resetForm = () => {
    form.fullName = "";
    form.selectedService = "";
    form.phoneNumber = "";
    form.description = "";
    form.quantity = null;
    form.agree = false;
    form.discount = 0;
};

const closeModal = () => {
    // Очищаем форму и ошибки при закрытии
    resetForm();
    validationErrors.value = {};
    emit("update:modelValue", false);
};

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

    isLoading.value = true;
    try {
        const response = await fetch("/submit-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        if (response.ok) {
            showSuccess(
                "Заказ успешно отправлен! Мы свяжемся с вами в ближайшее время.",
            );
            closeModal();
        } else {
            const data = await response.json().catch(() => ({}));
            if (data.errors) {
                validationErrors.value = data.errors;
                showError("Пожалуйста, исправьте ошибки в форме");
            } else {
                showError(
                    "Произошла ошибка при отправке заказа. Попробуйте еще раз.",
                );
            }
        }
    } catch {
        showError("Произошла ошибка при отправке заказа. Попробуйте еще раз.");
    } finally {
        isLoading.value = false;
    }
};

watch(
    () => props.modelValue,
    (newValue) => {
        if (!import.meta.client) return;
        if (newValue) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    },
    { immediate: true },
);

onUnmounted(() => {
    if (!import.meta.client) return;
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
            class="flex max-h-[calc(100vh-2rem)] w-full max-w-276 flex-col rounded-3xl bg-white shadow-lg"
        >
            <!-- Modal Header -->
            <div
                class="flex shrink-0 items-center justify-between px-4 py-4 md:px-8 md:py-8 lg:py-12 lg:pl-16 xl:py-16 xl:pl-35"
            >
                <h2
                    class="text-6 leading-[1.16em] font-bold text-black sm:text-8"
                >
                    Сделать заказ
                </h2>
                <!-- Close button -->
                <button
                    @click="closeModal"
                    class="shrink-0 p-2 text-black hover:scale-120 hover:font-black hover:text-gray-700"
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
            <div class="flex min-h-0 grow flex-col lg:flex-row-reverse">
                <!-- Right Column (Progress Bar) -->
                <div
                    class="w-full shrink-0 px-4 py-4 md:px-8 lg:w-1/3 lg:min-w-62 lg:pt-16 lg:pr-16 lg:pl-6 xl:pr-35"
                >
                    <div class="mb-4">
                        <h3
                            class="text-3.5 leading-normal font-normal text-[#0000008A]"
                        >
                            Шкала заполнения формы:
                        </h3>
                        <p
                            class="text-5.25 leading-[1.33em] font-normal text-black/80"
                        >
                            {{ discountPercentage }}%
                        </p>
                    </div>
                    <!-- Progress Bar -->
                    <div
                        class="mb-2 h-2 w-full max-w-51 rounded-md bg-[#F6F7F8]"
                    >
                        <div
                            class="h-2 rounded-md bg-brand"
                            :style="{ width: progressBarWidth + '%' }"
                        ></div>
                    </div>
                    <p
                        class="text-3.5 leading-normal font-normal text-[#0000008A]"
                    >
                        +2% за каждый пункт
                    </p>
                </div>

                <!-- Left Column (Form and Footer) -->
                <div
                    class="flex min-h-0 w-full grow flex-col px-4 py-4 md:px-8 md:py-8 lg:w-2/3 lg:py-12 lg:pl-16 xl:py-16 xl:pl-35"
                >
                    <!-- Modal Body (Form) - This is the main scrollable area -->
                    <div
                        class="flex min-h-0 grow flex-col gap-6 overflow-y-auto px-2.5 pb-8"
                    >
                        <!-- "Как к вам обращаться?" Section -->
                        <div>
                            <h3
                                class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80"
                            >
                                Как к вам обращаться?
                            </h3>
                            <input
                                type="text"
                                placeholder="Введите ФИО*"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-4 leading-normal text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
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
                                class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80"
                            >
                                Укажите услугу
                            </h3>

                            <input
                                type="text"
                                placeholder="Какой тип услуги Вам нужен?"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-4 leading-normal text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
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
                                class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80"
                            >
                                Контактные данные
                            </h3>
                            <input
                                type="tel"
                                placeholder="Введите номер телефона*"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-4 leading-normal text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
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
                                class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80"
                            >
                                Описание
                            </h3>
                            <textarea
                                placeholder="Введите описание"
                                :class="[
                                    'h-32 w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-4 leading-normal text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
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
                                class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80"
                            >
                                Количество единиц
                            </h3>
                            <input
                                type="number"
                                placeholder="Введите количество"
                                :class="[
                                    'w-full rounded-xl bg-[#244A7F0F] px-4 py-3 text-4 leading-normal text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2',
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

                    <!-- Footer section with agreement and button - shrink-0 to prevent it from shrinking -->
                    <div
                        class="flex shrink-0 flex-col items-start justify-between gap-4 pt-8 md:flex-row md:items-center"
                    >
                        <!-- Agreement Checkbox -->
                        <div class="flex w-full items-start md:w-2/3">
                            <!-- Adjust width as needed -->
                            <input
                                type="checkbox"
                                id="agreement"
                                class="mt-1 mr-2 shrink-0"
                                v-model="form.agree"
                            />
                            <label
                                for="agreement"
                                class="text-3.25 leading-[1.53em] font-normal text-[rgba(0,0,0,0.4)]"
                            >
                                Заполняя форму, я принимаю
                                <a
                                    :href="assetPath('/docs/Оферта.pdf')"
                                    download="Оферта.pdf"
                                    target="_blank"
                                    class="text-[#126DF7]"
                                >
                                    условия передачи информации
                                </a>
                                и даю
                                <a
                                    :href="assetPath('/docs/Соглашение.pdf')"
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
                        <div class="w-full shrink-0 md:w-auto">
                            <!-- Prevent button from shrinking -->
                            <button
                                :class="[
                                    'rounded-xl px-8 py-4 text-4 leading-tight font-medium text-white transition-all duration-200',
                                    !form.agree || isLoading
                                        ? 'cursor-not-allowed bg-gray-400 opacity-50'
                                        : 'bg-brand hover:bg-brand-border',
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

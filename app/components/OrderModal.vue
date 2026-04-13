<script setup lang="ts">
const assetPath = usePublicAsset();

import { watch, onUnmounted, computed, ref, reactive } from "vue";
import { useErrorHandler } from "@/composables/useErrorHandler";
import {
    validateForm,
    validationRules,
    formatPhoneNumber,
} from "@/lib/validation";

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const { showError, showSuccess, isLoading } = useErrorHandler();

const validationErrors = ref<Record<string, string>>({});
const selectedFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);

const form = reactive({
    fullName: "",
    selectedService: "",
    phoneNumber: "",
    address: "",
    description: "",
    discount: 0,
});

const resetForm = () => {
    form.fullName = "";
    form.selectedService = "";
    form.phoneNumber = "";
    form.address = "";
    form.description = "";
    form.discount = 0;
    selectedFile.value = null;
};

const closeModal = () => {
    resetForm();
    validationErrors.value = {};
    emit("update:modelValue", false);
};

const completedFieldsCount = computed(() => {
    let count = 0;
    if (form.fullName.trim() !== "") count++;
    if (form.selectedService !== "") count++;
    if (form.phoneNumber.trim() !== "") count++;
    if (form.address.trim() !== "") count++;
    if (form.description.trim() !== "") count++;
    if (selectedFile.value !== null) count++;
    return count;
});

const discountPercentage = computed(() => {
    return completedFieldsCount.value * 2;
});

const progressBarWidth = computed(() => {
    return Math.min(Math.round((completedFieldsCount.value / 6) * 100), 100);
});

const validateFormData = () => {
    const formData = {
        fullName: form.fullName,
        selectedService: form.selectedService,
        phoneNumber: form.phoneNumber,
        description: form.description,
    };

    const rules = {
        fullName: validationRules.fullName,
        selectedService: validationRules.selectedService,
        phoneNumber: validationRules.phoneNumber,
        description: validationRules.description,
    };

    const errors = validateForm(formData, rules);
    validationErrors.value = errors;

    return Object.keys(errors).length === 0;
};

const handlePhoneInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const formatted = formatPhoneNumber(target.value);
    form.phoneNumber = formatted;
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    selectedFile.value = target.files?.[0] ?? null;
};

const triggerFileInput = () => {
    fileInputRef.value?.click();
};

const handleSubmitOrder = async () => {
    if (!validateFormData()) {
        showError("Пожалуйста, исправьте ошибки в форме");
        return;
    }

    form.discount = discountPercentage.value;

    isLoading.value = true;
    try {
        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("selectedService", form.selectedService);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("address", form.address);
        formData.append("description", form.description);
        formData.append("discount", String(form.discount));
        if (selectedFile.value) {
            formData.append("file", selectedFile.value);
        }

        const response = await fetch("/submit-order", {
            method: "POST",
            body: formData,
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
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="closeModal">
        <!-- Modal Content -->
        <div class="flex max-h-[calc(100vh-2rem)] w-full max-w-276 flex-col rounded-3xl bg-white shadow-lg">
            <!-- Modal Header -->
            <div
                class="flex shrink-0 items-center justify-between px-4 py-4 md:px-8 md:py-8 lg:py-12 lg:pl-16 xl:py-16 xl:pl-35">
                <h2 class="text-6 leading-[1.16em] font-normal text-black sm:text-8">
                    Сделать заказ
                </h2>
                <button @click="closeModal" class="shrink-0 p-2 text-black hover:scale-120 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Container for Left and Right Columns -->
            <div class="flex min-h-0 grow flex-col lg:flex-row-reverse">
                <!-- Right Column (Progress Bar) -->
                <div class="w-full shrink-0 px-4 py-4 md:px-8 lg:w-1/3 lg:min-w-62 lg:pt-16 lg:pr-16 lg:pl-6 xl:pr-35">
                    <div class="mb-4">
                        <h3 class="text-3.5 leading-normal font-normal text-text-soft">
                            Шкала заполнения формы:
                        </h3>
                        <p class="text-5.25 leading-[1.33em] font-normal text-black/80">
                            {{ discountPercentage }}%
                        </p>
                    </div>
                    <div class="mb-2 h-2 w-full max-w-51 rounded-md bg-surface-muted">
                        <div class="h-2 rounded-md bg-brand" :style="{ width: progressBarWidth + '%' }"></div>
                    </div>
                    <p class="text-3.5 leading-normal font-normal text-text-soft">
                        +2% за каждый пункт
                    </p>
                </div>

                <!-- Left Column (Form and Footer) -->
                <div
                    class="flex min-h-0 w-full grow flex-col px-4 py-4 md:px-8 md:py-8 lg:w-2/3 lg:py-12 lg:pl-16 xl:py-16 xl:pl-35">
                    <!-- Modal Body (Form) -->
                    <div class="flex min-h-0 grow flex-col gap-6 overflow-y-auto px-2.5 pb-8">
                        <!-- ФИО -->
                        <div>
                            <h3 class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80">
                                Как к вам обращаться?
                            </h3>
                            <input type="text" placeholder="Введите ФИО*" :class="[
                                'w-full rounded-xl bg-input-fill px-4 py-3 text-4 leading-normal text-text-soft placeholder:text-text-soft outline-none focus:ring-2',
                                validationErrors.fullName
                                    ? 'ring-2 ring-red-500 focus:ring-red-500'
                                    : 'focus:ring-blue-500',
                            ]" v-model="form.fullName" />
                            <p v-if="validationErrors.fullName" class="mt-1 text-sm text-red-500">
                                {{ validationErrors.fullName }}
                            </p>
                        </div>

                        <!-- Контактные данные -->
                        <div>
                            <h3 class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80">
                                Контактные данные
                            </h3>
                            <input type="tel" placeholder="Введите номер телефона*" :class="[
                                'w-full rounded-xl bg-input-fill px-4 py-3 text-4 leading-normal text-text-soft placeholder:text-text-soft outline-none focus:ring-2',
                                validationErrors.phoneNumber
                                    ? 'ring-2 ring-red-500 focus:ring-red-500'
                                    : 'focus:ring-blue-500',
                            ]" v-model="form.phoneNumber" @input="handlePhoneInput" />
                            <p v-if="validationErrors.phoneNumber" class="mt-1 text-sm text-red-500">
                                {{ validationErrors.phoneNumber }}
                            </p>
                        </div>

                        <!-- Тип строения (select) -->
                        <div>
                            <h3 class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80">
                                Выберите тип строения
                            </h3>
                            <div class="relative">
                                <select :class="[
                                    'w-full appearance-none rounded-xl bg-input-fill px-4 py-3 text-4 leading-normal text-text-soft outline-none focus:ring-2',
                                    validationErrors.selectedService
                                        ? 'ring-2 ring-red-500 focus:ring-red-500'
                                        : 'focus:ring-blue-500',
                                ]" v-model="form.selectedService">
                                    <option value="" disabled>
                                        Какой тип строения Вам нужен?
                                    </option>
                                    <option value="Жилой дом">Жилой дом</option>
                                    <option value="Баня">Баня</option>
                                    <option value="Забор">Забор</option>
                                    <option value="Терраса">Терраса</option>
                                    <option value="Беседка">Беседка</option>
                                    <option value="Гараж">Гараж</option>
                                    <option value="Хозяйственная постройка">Хозяйственная постройка</option>
                                    <option value="Другое">Другое</option>
                                </select>
                                <div class="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                                    <svg class="h-4 w-4 text-text-soft" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor" stroke-width="2">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            <p v-if="validationErrors.selectedService" class="mt-1 text-sm text-red-500">
                                {{ validationErrors.selectedService }}
                            </p>
                        </div>

                        <!-- Адрес монтажа -->
                        <div>
                            <h3 class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80">
                                Адрес монтажа
                            </h3>
                            <input type="text" placeholder="Введите адрес"
                                class="w-full rounded-xl bg-input-fill px-4 py-3 text-4 leading-normal text-text-soft placeholder:text-text-soft outline-none focus:ring-2 focus:ring-blue-500"
                                v-model="form.address" />
                        </div>

                        <!-- Описание -->
                        <div>
                            <h3 class="mb-5 text-5.25 leading-[1.33em] font-normal text-black/80">
                                Описание
                            </h3>
                            <input type="text" placeholder="Введите описание" :class="[
                                'w-full rounded-xl bg-input-fill px-4 py-3 text-4 leading-normal text-text-soft placeholder:text-text-soft outline-none focus:ring-2',
                                validationErrors.description
                                    ? 'ring-2 ring-red-500 focus:ring-red-500'
                                    : 'focus:ring-blue-500',
                            ]" v-model="form.description" />
                            <p v-if="validationErrors.description" class="mt-1 text-sm text-red-500">
                                {{ validationErrors.description }}
                            </p>
                        </div>

                        <!-- Загрузка файла -->
                        <div>
                            <p class="mb-3 text-4 leading-normal text-black/80">
                                Возможно у вас есть проект или план, прикрепите
                                его
                                <span class="text-text-soft">(по желанию)</span>
                            </p>
                            <input ref="fileInputRef" type="file" class="hidden"
                                accept=".pdf,.jpg,.jpeg,.png,.dwg,.doc,.docx" @change="handleFileChange" />
                            <button type="button" @click="triggerFileInput"
                                class="flex h-24 w-24 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-brand bg-transparent text-brand transition-colors hover:bg-brand-light">
                                <img :src="assetPath('/icons/file-arrow-up.svg')" alt="" class="h-8 w-8" />
                                <span class="text-3 leading-tight text-center px-1">
                                    {{
                                        selectedFile
                                            ? selectedFile.name
                                            : "Прикрепите файл"
                                    }}
                                </span>
                            </button>
                        </div>
                    </div>

                    <!-- Footer -->
                    <div
                        class="flex shrink-0 flex-col items-start justify-between gap-4 pt-8 md:flex-row md:items-center">
                        <p class="w-full text-3.25 leading-[1.53em] font-normal text-text-faint md:w-2/3">
                            Заполняя форму, я принимаю
                            <a :href="assetPath('/docs/Оферта.pdf')" download="Оферта.pdf" target="_blank"
                                class="text-brand">
                                условия передачи информации
                            </a>
                            и даю
                            <a :href="assetPath('/docs/Соглашение.pdf')" download="Соглашение.pdf" target="_blank"
                                class="text-brand">
                                согласие на получение информации о продуктах и
                                услугах <span class="font-bold">свaи.рф</span>
                            </a>
                        </p>

                        <div class="w-full shrink-0 md:w-auto">
                            <button :class="[
                                'rounded-xl px-8 py-4 text-4 leading-tight font-medium text-white transition-all duration-200',
                                isLoading
                                    ? 'cursor-not-allowed bg-gray-400 opacity-50'
                                    : 'bg-brand hover:bg-brand-border',
                            ]" :disabled="isLoading" @click="handleSubmitOrder">
                                <span v-if="isLoading" class="flex items-center">
                                    <svg class="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            stroke-width="4"></circle>
                                        <path class="opacity-75" fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                        </path>
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

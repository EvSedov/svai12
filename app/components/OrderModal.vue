<script setup lang="ts">
const assetPath = usePublicAsset();

import { watch, onUnmounted, onMounted, computed, ref, reactive, nextTick } from "vue";
import { useErrorHandler } from "@/composables/useErrorHandler";
import {
    validateForm,
    validationRules,
    formatPhoneNumber,
} from "@/lib/validation";

type TurnstileRenderOptions = {
    sitekey: string;
    callback?: (token: string) => void;
    "expired-callback"?: () => void;
    "error-callback"?: () => void;
};

type TurnstileApi = {
    render: (container: string | HTMLElement, options: TurnstileRenderOptions) => string | number;
    reset: (widgetId?: string | number) => void;
    remove?: (widgetId?: string | number) => void;
};

declare global {
    interface Window {
        turnstile?: TurnstileApi;
    }
}

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
});

const emit = defineEmits(["update:modelValue"]);

const { showError, showSuccess, isLoading } = useErrorHandler();
const runtimeConfig = useRuntimeConfig();

const validationErrors = ref<Record<string, string>>({});
const selectedFile = ref<File | null>(null);
const fileInputRef = ref<HTMLInputElement | null>(null);
const turnstileContainerRef = ref<HTMLDivElement | null>(null);
const turnstileToken = ref("");
const turnstileWidgetId = ref<string | number | null>(null);
const isTurnstileScriptLoading = ref(false);
const turnstileScriptFailed = ref(false);
const turnstileSiteKey = computed(() => runtimeConfig.public.turnstileSiteKey || "");
const isTurnstileEnabled = computed(() => turnstileSiteKey.value.trim() !== "");

const form = reactive({
    fullName: "",
    selectedService: "",
    phoneNumber: "",
    address: "",
    description: "",
    website: "",
    formStartedAt: Date.now(),
    discount: 0,
});

const clearFormError = () => {
    if (validationErrors.value.form) {
        const { form, ...rest } = validationErrors.value;
        validationErrors.value = rest;
    }
};

const setFormError = (message: string) => {
    validationErrors.value = {
        ...validationErrors.value,
        form: message,
    };
};

const normalizeValidationErrors = (errors: Record<string, string | string[]>) => {
    const normalized: Record<string, string> = {};

    for (const [key, value] of Object.entries(errors)) {
        normalized[key] = Array.isArray(value) ? value[0] ?? "" : value;
    }

    return normalized;
};

const resetForm = () => {
    form.fullName = "";
    form.selectedService = "";
    form.phoneNumber = "";
    form.address = "";
    form.description = "";
    form.website = "";
    form.formStartedAt = Date.now();
    form.discount = 0;
    selectedFile.value = null;
    turnstileToken.value = "";
};

const closeModal = () => {
    resetTurnstileWidget();
    resetForm();
    validationErrors.value = {};
    emit("update:modelValue", false);
};

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

const handleFieldFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement | null;
    if (!import.meta.client || !target) {
        return;
    }

    window.setTimeout(() => {
        target.scrollIntoView({
            block: "center",
            behavior: "smooth",
        });
    }, 250);
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    selectedFile.value = target.files?.[0] ?? null;
};

const resetTurnstileWidget = () => {
    if (!import.meta.client || !window.turnstile) {
        return;
    }

    turnstileToken.value = "";
    clearFormError();

    if (turnstileWidgetId.value !== null) {
        window.turnstile.reset(turnstileWidgetId.value);
    }
};

const loadTurnstileScript = async () => {
    if (!import.meta.client || !isTurnstileEnabled.value) {
        return;
    }

    if (window.turnstile) {
        return;
    }

    if (isTurnstileScriptLoading.value) {
        while (isTurnstileScriptLoading.value) {
            await new Promise((resolve) => setTimeout(resolve, 50));
        }
        return;
    }

    isTurnstileScriptLoading.value = true;

    try {
        await new Promise<void>((resolve, reject) => {
            let existingScript = document.querySelector<HTMLScriptElement>(
                'script[data-turnstile-script="true"]',
            );

            if (existingScript) {
                if (turnstileScriptFailed.value) {
                    existingScript.remove();
                    existingScript = null;
                    turnstileScriptFailed.value = false;
                } else {
                    existingScript.addEventListener("load", () => resolve(), { once: true });
                    existingScript.addEventListener("error", () => {
                        turnstileScriptFailed.value = true;
                        reject(new Error("turnstile-load-failed"));
                    }, { once: true });
                    return;
                }
            }

            if (!existingScript) {
                const script = document.createElement("script");
                script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
                script.async = true;
                script.defer = true;
                script.dataset.turnstileScript = "true";
                script.onload = () => {
                    turnstileScriptFailed.value = false;
                    resolve();
                };
                script.onerror = () => {
                    turnstileScriptFailed.value = true;
                    reject(new Error("turnstile-load-failed"));
                };
                document.head.appendChild(script);
            }
        });
    } finally {
        isTurnstileScriptLoading.value = false;
    }
};

const renderTurnstile = async () => {
    if (!import.meta.client || !isTurnstileEnabled.value) {
        return;
    }

    await nextTick();
    await loadTurnstileScript();

    if (!window.turnstile || !turnstileContainerRef.value) {
        return;
    }

    if (turnstileWidgetId.value !== null) {
        window.turnstile.reset(turnstileWidgetId.value);
        return;
    }

    turnstileWidgetId.value = window.turnstile.render(turnstileContainerRef.value, {
        sitekey: turnstileSiteKey.value,
        callback: (token: string) => {
            turnstileToken.value = token;
            clearFormError();
        },
        "expired-callback": () => {
            turnstileToken.value = "";
            setFormError("Проверка истекла. Подтвердите, что вы не робот, еще раз.");
        },
        "error-callback": () => {
            turnstileToken.value = "";
            setFormError("Не удалось загрузить проверку. Обновите форму и попробуйте еще раз.");
        },
    });
};

const triggerFileInput = () => {
    fileInputRef.value?.click();
};

const handleSubmitOrder = async () => {
    if (!validateFormData()) {
        showError("Пожалуйста, исправьте ошибки в форме");
        return;
    }

    if (isTurnstileEnabled.value && !turnstileToken.value) {
        setFormError("Подтвердите, что вы не робот.");
        showError("Подтвердите, что вы не робот.");
        return;
    }

    clearFormError();
    form.discount = 0;

    isLoading.value = true;
    try {
        const formData = new FormData();
        formData.append("fullName", form.fullName);
        formData.append("selectedService", form.selectedService);
        formData.append("phoneNumber", form.phoneNumber);
        formData.append("address", form.address);
        formData.append("description", form.description);
        formData.append("website", form.website);
        formData.append("formStartedAt", String(form.formStartedAt));
        formData.append("discount", String(form.discount));
        formData.append("cf-turnstile-response", turnstileToken.value);
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
                validationErrors.value = normalizeValidationErrors(data.errors);
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

onMounted(async () => {
    if (props.modelValue) {
        await renderTurnstile();
    }
});

watch(
    () => props.modelValue,
    async (newValue) => {
        if (!import.meta.client) return;
        if (newValue) {
            document.body.style.overflow = "hidden";
            await renderTurnstile();
        } else {
            document.body.style.overflow = "";
            resetTurnstileWidget();
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
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-0 sm:p-4"
        @click.self="closeModal">
        <!-- Modal Content -->
        <div
            class="flex h-dvh w-screen flex-col bg-white shadow-lg sm:h-auto sm:max-h-[calc(100vh-2rem)] sm:w-full sm:max-w-276 sm:rounded-3xl">
            <!-- Modal Header -->
            <div
                class="sticky top-0 z-20 flex shrink-0 items-center justify-between border-b border-black/5 bg-white px-4 py-4 md:px-8 md:py-6 lg:static lg:border-b-0 lg:py-8 lg:pl-16 xl:py-10 xl:pl-35">
                <h2 class="font-montserrat text-[28px] leading-[1.1] font-semibold tracking-[0.02em] text-content-primary sm:text-[32px]">
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
            <div class="flex min-h-0 grow flex-col lg:flex-row">
                <!-- Left Column (Form and Footer) -->
                <div
                    class="order-1 flex min-h-0 w-full grow flex-col px-4 py-4 md:px-8 md:py-8 lg:w-2/3 lg:pt-0 lg:pb-8 lg:pl-16 xl:pt-0 xl:pb-10 xl:pl-35">
                    <!-- Modal Body (Form) -->
                    <div class="flex min-h-0 grow flex-col gap-5 overflow-y-auto px-2.5 pb-6 md:gap-6 md:pb-8">
                        <div class="hidden" aria-hidden="true">
                            <label for="website-field">Website</label>
                            <input id="website-field" type="text" tabindex="-1" autocomplete="off"
                                v-model="form.website" />
                        </div>

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
                            ]" v-model="form.fullName" @focus="handleFieldFocus" />
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
                            ]" v-model="form.phoneNumber" @input="handlePhoneInput" @focus="handleFieldFocus" />
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
                                ]" v-model="form.selectedService" @focus="handleFieldFocus">
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
                                v-model="form.address" @focus="handleFieldFocus" />
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
                            ]" v-model="form.description" @focus="handleFieldFocus" />
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
                            <input ref="fileInputRef" type="file" class="hidden" accept=".pdf,.jpg,.jpeg,.png,.webp"
                                @change="handleFileChange" />
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

                        <div v-if="isTurnstileEnabled">
                            <p class="mb-3 text-4 leading-normal text-black/80">
                                Подтвердите, что вы не робот
                            </p>
                            <div ref="turnstileContainerRef"></div>
                        </div>

                        <p v-if="validationErrors.form" class="text-sm text-red-500">
                            {{ validationErrors.form }}
                        </p>
                    </div>

                    <!-- Footer -->
                    <div
                        class="sticky bottom-0 flex shrink-0 flex-col items-start justify-between gap-4 border-t border-black/5 bg-white px-2.5 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:flex-row md:items-center md:pt-6">
                        <p
                            class="w-full text-[12px] leading-[1.3] font-normal text-text-faint md:w-2/3 md:text-3.25 md:leading-[1.53em]">
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

                <!-- Right Column (Discount Info) -->
                <div
                    class="order-2 w-full shrink-0 px-4 pt-0 pb-4 md:px-8 lg:w-1/3 lg:min-w-62 lg:pr-16 lg:pl-6 xl:pr-35">
                    <div class="rounded-2xl bg-brand-light px-4 py-4">
                        <p
                            class="text-[12px] leading-[1.2] font-semibold tracking-hero-cta-primary text-brand uppercase md:text-3.5 md:leading-normal">
                            Скидка
                        </p>
                        <p class="mt-2 text-[12px] leading-[1.3] font-normal text-black/80 md:text-5 md:leading-[1.4]">
                            Скидка 5% при заказе от 200000 руб.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

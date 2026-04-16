<script setup lang="ts">
import { ref, watch, computed } from "vue";

const props = defineProps({
    modelValue: {
        type: [String, Array], // Can be string for single, array for multi
        default: () => [], // Default for array, will be overwritten by watch for string
    },
    options: {
        type: Array<{ value: string; label: string }>,
        required: true,
    },
    placeholder: {
        type: String,
        default: "Выберите опцию",
    },
    multiple: {
        // New prop for multi-select
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);
// Internal state for selected option(s)
const selectedOption = ref<string | string[]>(
    props.multiple
        ? (props.modelValue as string[]) || []
        : (props.modelValue as string) || "",
);

// Update internal state when modelValue changes from parent
watch(
    () => props.modelValue,
    (newValue) => {
        if (props.multiple) {
            selectedOption.value = (newValue as string[]) || [];
        } else {
            selectedOption.value = (newValue as string) || "";
        }
    },
    { immediate: true },
); // Immediate to sync initial value

// Вычисляемое свойство для отображения выбранной опции
const displayedValue = computed(() => {
    if (props.multiple) {
        const currentSelection = selectedOption.value as string[];
        const selectedLabels = currentSelection
            .map((val) => props.options.find((opt) => opt.value === val)?.label)
            .filter((label) => label !== undefined) as string[]; // Filter out undefined if value not found
        return selectedLabels.length > 0
            ? selectedLabels.join(", ")
            : props.placeholder;
    } else {
        const option = props.options.find(
            (opt) => opt.value === (selectedOption.value as string),
        );
        return option ? option.label : props.placeholder;
    }
});

// Открытие/закрытие выпадающего списка
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

// Clear selected value(s)
const clearSelection = () => {
    if (props.multiple) {
        selectedOption.value = [];
        emit("update:modelValue", []);
    } else {
        selectedOption.value = "";
        emit("update:modelValue", "");
    }
    isOpen.value = false; // Close after clearing
};

// Select/Deselect option
const selectOption = (option: { value: string; label: string }) => {
    if (props.multiple) {
        const currentSelection = selectedOption.value as string[];
        if (currentSelection.includes(option.value)) {
            // Deselect
            const newSelection = currentSelection.filter(
                (val) => val !== option.value,
            );
            selectedOption.value = newSelection;
            emit("update:modelValue", newSelection);
        } else {
            // Select
            const newSelection = [...currentSelection, option.value];
            selectedOption.value = newSelection;
            emit("update:modelValue", newSelection);
        }
        // Keep dropdown open for multi-select unless it's a single selection
    } else {
        selectedOption.value = option.value;
        emit("update:modelValue", option.value);
        isOpen.value = false; // Close for single-select
    }
};

// Check if option is selected for styling
const isOptionSelected = (optionValue: string) => {
    if (props.multiple) {
        return (selectedOption.value as string[]).includes(optionValue);
    } else {
        return selectedOption.value === optionValue;
    }
};

// Закрытие при клике вне компонента
const onClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".custom-select-container")) {
        isOpen.value = false;
    }
};

watch(isOpen, (newValue) => {
    if (newValue) {
        document.addEventListener("click", onClickOutside);
    } else {
        document.removeEventListener("click", onClickOutside);
    }
});
</script>

<template>
    <div class="custom-select-container relative">
        <!-- Видимый элемент, который заменяет нативный select -->
        <div
            class="flex w-full cursor-pointer items-center justify-between rounded-xl bg-[#244A7F0F] px-4 py-3 text-[16px] leading-[1.5em] text-[#0000008A] placeholder-[#0000008A] outline-none focus:ring-2 focus:ring-blue-500"
            @click="toggleDropdown"
        >
            <span class="w-[90%] flex-grow">{{ displayedValue }}</span>
            <button
                v-if="
                    (multiple && (selectedOption as string[]).length > 0) ||
                    (!multiple && selectedOption !== '')
                "
                @click.stop="clearSelection"
                class="ml-2 text-gray-500 hover:text-gray-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
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
            <!-- Иконка стрелки -->
            <svg
                :class="{ 'rotate-180': isOpen }"
                class="ml-2 h-5 w-5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                ></path>
            </svg>
        </div>

        <!-- Выпадающий список опций -->
        <div
            v-if="isOpen"
            class="absolute z-10 mt-1 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
        >
            <ul class="py-1">
                <li
                    v-for="option in options"
                    :key="option.value"
                    @click="selectOption(option)"
                    class="cursor-pointer px-4 py-2 text-[16px] leading-[1.5em] text-[#000000CC] hover:bg-blue-100"
                    :class="{ 'bg-blue-50': isOptionSelected(option.value) }"
                >
                    {{ option.label }}
                    <span
                        v-if="multiple && isOptionSelected(option.value)"
                        class="float-right text-blue-600"
                    >
                        <svg
                            class="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z"
                                clip-rule="evenodd"
                            />
                        </svg>
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped></style>

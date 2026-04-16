<script setup lang="ts">
import { defineProps, defineEmits, withDefaults } from "vue";

interface Props {
    name: string; // Текст кнопки
    value: string; // Значение фильтра
    isActive: boolean; // Флаг активности
    icon?: string; // Необязательное поле: имя или путь к иконке (заглушка)
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
});

const emit = defineEmits(["update:isActive", "click"]);

const handleClick = () => {
    // Эмитируем событие для обновления состояния активности
    // emit("update:isActive", !props.isActive);
    // Эмитируем событие клика, передавая значение фильтра
    emit("click", props.value);
};
</script>

<template>
    <button
        :class="{
            'bg-[#2C2C2C] text-white': isActive, // Активное состояние (цвет фона и текста из Figma)
            'border border-[#2C2C2C] bg-white text-[#2C2C2C]': !isActive, // Неактивное состояние (фон, текст, рамка из Figma)
        }"
        class="flex min-w-40 items-center justify-center rounded-lg px-5 py-1.5 text-sm font-normal transition-colors duration-200"
        @click="handleClick"
    >
        <span v-if="icon" class="mr-1">🔥</span>
        <!-- Заглушка для иконки. TODO: Заменить на реальную иконку -->
        {{ name }}
    </button>
</template>

<style scoped>
/* Дополнительные стили, если нужны */
</style>

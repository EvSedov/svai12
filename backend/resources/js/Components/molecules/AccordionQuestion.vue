<script setup lang="ts">
import AccordionToggleIcon from "@/Components/atoms/AccordionToggleIcon.vue";

defineProps<{
    question: string;
    isOpen: boolean;
}>();

defineEmits<{
    (e: "toggle"): void;
}>();
</script>

<template>
    <button
        class="flex w-full items-center justify-between py-3.5 text-left focus:outline-none"
        @click="$emit('toggle')"
    >
        <span class="text-2xl text-[#2C2C2C]">{{ question }}</span>
        <AccordionToggleIcon :is-open="isOpen" />
    </button>
</template>

<style scoped>
button:focus {
    outline: none;
}
</style>

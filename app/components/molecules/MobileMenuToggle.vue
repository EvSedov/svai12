<script setup lang="ts">
defineProps<{
    open?: boolean
}>()

const emit = defineEmits<{
    toggle: []
}>()
</script>

<template>
    <button
        type="button"
        class="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-bg-main transition-colors"
        :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
        :aria-expanded="open"
        @click="emit('toggle')"
    >
        <span
            class="block w-6 h-0.5 bg-content-primary transition-all duration-200"
            :class="open ? 'translate-y-2 rotate-45' : ''"
        />
        <span
            class="block w-6 h-0.5 bg-content-primary transition-all duration-200"
            :class="open ? 'opacity-0' : ''"
        />
        <span
            class="block w-6 h-0.5 bg-content-primary transition-all duration-200"
            :class="open ? '-translate-y-2 -rotate-45' : ''"
        />
    </button>
</template>

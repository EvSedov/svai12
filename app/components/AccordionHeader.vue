<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <h3 class="mb-4 ml-6 text-[28px] font-bold tracking-wider text-content-primary">
        {{ title }}
    </h3>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
}>();
</script>

<template>
    <h3
        class="mb-4 ml-6 text-center text-[28px] font-bold tracking-wider text-[#2C2C2C]"
    >
        {{ title }}
    </h3>
</template>

<style scoped></style>

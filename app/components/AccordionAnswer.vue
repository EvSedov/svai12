<script setup lang="ts">
defineProps<{
    answer: string;
    isVisible: boolean;
}>();
</script>

<template>
    <div v-show="isVisible" class="prose max-w-none pb-5">
        <p class="text-base leading-relaxed text-gray-600">{{ answer }}</p>
    </div>
</template>

<style scoped>
.prose p {
    margin-bottom: 0.5rem;
}
</style>

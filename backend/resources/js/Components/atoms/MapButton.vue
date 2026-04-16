<script setup lang="ts">
// Атомарный компонент для кнопки управления картой
defineProps<{
  text: string;
}>();
</script>

<template>
  <button class="bg-white px-3 py-2 rounded shadow text-sm flex items-center">
    <span>{{ text }}</span>
  </button>
</template>

<style scoped>
button span {
  font-family: "Commissioner";
}
</style> 
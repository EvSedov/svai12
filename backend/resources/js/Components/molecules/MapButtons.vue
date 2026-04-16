<script setup lang="ts">
import MapButton from '@/Components/atoms/MapButton.vue';

// Компонент с кнопками управления для карты
const mapButtons = [
  { id: 1, text: 'Как добраться' },
  { id: 2, text: 'Доехать на такси' },
  { id: 3, text: 'Создать свою карту' }
];
</script>

<template>
  <div class="absolute bottom-4 left-4 flex space-x-4">
    <MapButton 
      v-for="button in mapButtons" 
      :key="button.id" 
      :text="button.text" 
    />
  </div>
</template> 
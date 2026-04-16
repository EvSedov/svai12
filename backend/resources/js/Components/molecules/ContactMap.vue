<script setup lang="ts">
import MapButtons from "@/Components/molecules/MapButtons.vue";
const mapImage = "/images/2gis-map.png";
</script>

<template>
    <div
        class="relative mb-8 h-auto max-h-[300px] w-full max-w-[746px] overflow-hidden rounded-lg bg-gray-200"
    >
        <!-- Здесь будет интеграция с Яндекс картой -->
        <img :src="mapImage" alt="Карта" class="h-full w-full object-cover" />

        <!-- Кнопки управления картой 
        <MapButtons /> -->
    </div>
</template>

<script setup lang="ts">
import MapButtons from '@/components/MapButtons.vue';
const assetPath = usePublicAsset();
const mapImage = assetPath("/images/2gis-map.png");
</script>

<template>
    <div
        class="relative mb-8 h-auto max-h-75 w-full max-w-186.5 overflow-hidden rounded-lg bg-gray-200"
    >
        <!-- Здесь будет интеграция с Яндекс картой -->
        <img :src="mapImage" alt="Карта" class="h-full w-full object-cover" />

        <!-- Кнопки управления картой
        <MapButtons /> -->
    </div>
</template>

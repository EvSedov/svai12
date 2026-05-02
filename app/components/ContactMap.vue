<script setup lang="ts">
import MapButtons from '@/components/MapButtons.vue';
const assetPath = usePublicAsset();
const mapImage = assetPath("/images/2gis-map.png");

withDefaults(defineProps<{
    expanded?: boolean;
}>(), {
    expanded: false,
});
</script>

<template>
    <div
        :class="expanded ? 'h-full max-h-none max-w-none mb-0 rounded-none bg-bg-main' : 'mb-8 h-auto max-h-75 max-w-186.5 rounded-lg bg-gray-200'"
        class="relative w-full overflow-hidden"
    >
        <!-- Здесь будет интеграция с Яндекс картой -->
        <img :src="mapImage" alt="Карта" class="h-full w-full object-cover" />

        <!-- Кнопки управления картой
        <MapButtons /> -->
    </div>
</template>

<script setup lang="ts">
// Скриншот карты: public/images/2gis-map.png
const mapImage = '/images/2gis-map.png';
</script>

<template>
    <div
        class="relative mb-8 h-auto max-h-[300px] w-full max-w-[746px] overflow-hidden rounded-lg bg-gray-200"
    >
        <img :src="mapImage" alt="Карта — Республика Марий Эл, Оршанский р-н, д.Лужбеляк" class="h-full w-full object-cover" />
    </div>
</template>

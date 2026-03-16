<script setup lang="ts">
const route = useRoute()
useHead({ title: `Сваи ${route.params.slug} мм — Свай12` })
</script>

<template>
    <div class="container mx-auto px-4 py-12">
        <h1 class="text-3xl font-bold text-content-primary mb-4">
            Сваи {{ $route.params.slug }} мм
        </h1>
        <p class="text-content-secondary">Раздел в разработке.</p>
    </div>
</template>

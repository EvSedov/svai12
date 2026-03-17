<script setup lang="ts">
const assetPath = usePublicAsset();
</script>

<template>
    <img :src="assetPath('/Logo.png')" alt="Логотип свай12.рф" />
</template>

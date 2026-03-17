<script setup lang="ts">
const assetPath = usePublicAsset();
</script>

<template>
    <img :src="assetPath('/icons/arrow-right.svg')" alt="icon arrow-right" />
</template>

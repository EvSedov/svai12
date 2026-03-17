<script setup lang="ts">
const assetPath = usePublicAsset();
</script>

<template>
    <img :src="assetPath('/icons/phone-arrow-down-left.svg')" alt="Иконка обратного звонка" />
</template>

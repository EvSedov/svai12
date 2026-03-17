<script setup lang="ts">
import { ref, provide } from "vue";
import OrderModal from "@/components/OrderModal.vue";

const isOrderModalOpen = ref(false);
const openOrderModal = () => {
    isOrderModalOpen.value = true;
};

provide("openOrderModal", openOrderModal);
</script>

<template>
    <div class="wrap">
        <LayoutHeader />
    </div>
    <div class="main grow">
        <div class="wrap bg-bg-main">
            <LayoutDiscount />
            <slot />
        </div>
    </div>
    <LayoutFooter />

    <OrderModal v-model="isOrderModalOpen" />
</template>

<style scoped lang="css">
.main {
    width: 100%;
}

.wrap {
    width: 100%;
    margin: 0 auto;
    padding-top: 10px;
}
</style>

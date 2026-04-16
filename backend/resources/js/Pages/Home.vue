<script setup lang="ts">
import Header from "@/Components/organisms/Header.vue";
import Discount from "@/Components/molecules/Discount.vue";
import Footer from "@/Components/organisms/Footer.vue";
import HowWeWork from "@/Components/organisms/sections/HowWeWork.vue";
import ExamplesProducts from "@/Components/organisms/sections/ExamplesProducts.vue";
import ContactInfo from "@/Components/organisms/sections/ContactInfo.vue";
import PaymentMethods from "@/Components/organisms/sections/PaymentMethods.vue";

import { ref, provide } from "vue";
import OrderModal from "@/Components/organisms/OrderModal.vue";
import HeroPrintAllYouWant from "@/Components/organisms/sections/HeroPrintAllYouWant.vue";
import FilterWorks from "@/Components/organisms/FilterWorks.vue";

const isOrderModalOpen = ref(false);
const currentActiveFilters = ref<string[]>([]);
const openOrderModal = () => {
    isOrderModalOpen.value = true;
};
const handleFiltersUpdate = (activeFilters: string[]) => {
    currentActiveFilters.value = activeFilters;
    console.log("Filters updated in parent:", currentActiveFilters.value);
};

provide("openOrderModal", openOrderModal);
</script>

<template>
    <div class="wrap">
        <Header />
    </div>
    <div class="main grow">
        <div class="wrap bg-bg-main">
            <Discount />
            <HeroPrintAllYouWant />
            <HowWeWork />
            <FilterWorks @filters-changed="handleFiltersUpdate" />
            <ExamplesProducts :active-filters="currentActiveFilters" />
            <ContactInfo />
            <PaymentMethods />
        </div>
    </div>
    <Footer />

    <OrderModal v-model="isOrderModalOpen" />
</template>

<style scoped lang="css">
.main {
    width: 100%;
}
.wrap {
    width: 100%;
    /* max-width: 1920px; */
    margin: 0 auto;
    padding-top: 10px;
}
</style>

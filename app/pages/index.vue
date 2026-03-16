<script setup lang="ts">
import { ref } from "vue";

const currentActiveFilters = ref<string[]>([]);
const handleFiltersUpdate = (activeFilters: string[]) => {
    currentActiveFilters.value = activeFilters;
};
</script>

<template>
    <div class="wrap bg-bg-main">
        <SectionsHeroSvai />
        <SectionsHowWeWork />
        <FilterWorks @filters-changed="handleFiltersUpdate" />
        <SectionsExamplesProducts :active-filters="currentActiveFilters" />
        <SectionsContactInfo />
        <SectionsPaymentMethods />
    </div>
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

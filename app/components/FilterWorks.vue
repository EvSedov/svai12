<script setup lang="ts">
import { ref } from "vue";
import FilterButton from "@/components/FilterButton.vue";

interface FilterCategory {
    id: number;
    name: string;
    value: string;
    isActive: boolean;
}

const filterCategories = ref<FilterCategory[]>([
    { id: 1, name: "Показать всё", value: "all", isActive: true },
    { id: 2, name: "Винтовые сваи", value: "screw-piles", isActive: false },
    { id: 3, name: "Оголовки", value: "caps", isActive: false },
]);

const emit = defineEmits(["filters-changed"]);

const handleFilterClick = (clickedValue: string) => {
    filterCategories.value = filterCategories.value.map((category) => ({
        ...category,
        isActive: category.value === clickedValue,
    }));

    emit(
        "filters-changed",
        clickedValue === "all" ? [] : [clickedValue],
    );
};
</script>

<template>
    <section id="examples"
        class="mt-30 bg-bg-main px-4 pt-18 pb-12 md:px-6 md:pt-22 md:pb-14 lg:px-8 lg:pt-26 lg:pb-16">
        <div class="mx-auto flex max-w-395 flex-col items-center text-center">
            <h2
                class="mb-8 font-montserrat text-hero-title-tablet leading-8 font-semibold tracking-[0.02em] text-black md:mb-10 md:text-hero-title-desktop">
                Каталог <span class="text-brand">винтовых свай</span> и <span class="text-brand">оголовков</span>
            </h2>

            <div class="flex flex-wrap items-center justify-center gap-3">
                <FilterButton v-for="category in filterCategories" :key="category.id" :name="category.name"
                    :value="category.value" :is-active="category.isActive" @click="handleFilterClick" />
            </div>
        </div>
    </section>
</template>

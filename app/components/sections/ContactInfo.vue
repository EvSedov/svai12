<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import ContactMap from "@/components/ContactMap.vue";
import FaqAccordion from "@/components/FaqAccordion.vue";
import ContactDetails from "@/components/ContactDetails.vue";
import { faqGroups } from "@/data/faq";

const isMapZoomed = ref(false); // Reactive property to control map zoom

const toggleMapZoom = () => {
    isMapZoomed.value = !isMapZoomed.value;
};

// Watch for changes in isMapZoomed to control body scroll
watch(
    isMapZoomed,
    (newValue) => {
        if (!import.meta.client) return;
        if (newValue) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    },
    { immediate: true }, // Run immediately to set initial state if needed
);

// Reset body scroll when component is unmounted
onUnmounted(() => {
    if (!import.meta.client) return;
    document.body.style.overflow = "";
});
</script>

<template>
    <section id="contacts" class="w-full bg-white pt-10 pb-15 md:pt-18">
        <div class="mx-auto max-w-292.5 px-4 md:px-6 lg:px-8">
            <!-- Заголовок секции -->
            <h2
                class="mb-8 text-center font-montserrat text-hero-title-tablet leading-8 font-semibold tracking-wide text-black md:mb-10 md:text-hero-title-desktop">
                Контактная <span class="text-brand">информация</span>
            </h2>

            <!-- Контактная информация с картой -->
            <div class="mb-8 flex flex-col-reverse items-center gap-8 xl:flex-row xl:items-start xl:gap-23.5">
                <!-- Левая колонка: Карта и FAQ -->
                <div class="flex w-full flex-col items-center pt-0 pl-0 xl:w-auto xl:items-start xl:pt-2 xl:pl-2">
                    <!-- Яндекс карта (original size) -->
                    <ContactMap @click="toggleMapZoom" class="cursor-pointer" />

                    <!-- FAQ секция (перемещена под карту) -->
                    <FaqAccordion :groups="faqGroups" id="faqs" />
                </div>

                <!-- Контактная информация (правая часть) -->
                <div class="mx-auto xl:mx-0 xl:w-2/5">
                    <ContactDetails />
                </div>
            </div>
        </div>
    </section>

    <!-- Overlay for zoomed map -->
    <div v-if="isMapZoomed" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="toggleMapZoom">
        <!-- Zoomed Map Container -->
        <div class="relative z-10 flex max-h-[90vh] w-[90vw] flex-col overflow-hidden rounded-3xl bg-white shadow-lg">
            <!-- Close button for zoomed map -->
            <button @click="toggleMapZoom"
                class="absolute top-4 right-4 z-20 shrink-0 rounded-full bg-white p-2 text-text-dark transition-all duration-300 ease-in-out hover:scale-110 hover:text-gray-700 active:translate-y-0.5 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <!-- ContactMap in zoomed state -->
            <ContactMap expanded class="h-full w-full" />
        </div>
    </div>
</template>

<style scoped>
/* Стили для секции FAQ */
button:focus {
    outline: none;
}

.prose p {
    margin-bottom: 0.5rem;
}
</style>

<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import ContactMap from "@/Components/molecules/ContactMap.vue";
import FaqAccordion from "@/Components/molecules/FaqAccordion.vue";
import ContactDetails from "@/Components/molecules/ContactDetails.vue";

// Данные для FAQ
const faqItems = [
    {
        question: "Как сделать заказ?",
        answer: "Подробная информация о процессе оформления заказа в нашей компании.",
    },
    {
        question: "У вас есть санитарные зоны?",
        answer: "Информация о расположении санитарных зон в нашем офисе.",
    },
    {
        question: "Как покупать в рассрочку?",
        answer: "Подробная информация о возможностях покупки товаров в рассрочку.",
    },
    {
        question: "Как еще можно получить у вас футболку?",
        answer: "Информация о специальных предложениях и акциях компании.",
    },
    {
        question: "Как начисляется кэшбэк?",
        answer: "Детальная информация о программе лояльности и начислении кэшбэка.",
    },
];

const isMapZoomed = ref(false); // Reactive property to control map zoom

const toggleMapZoom = () => {
    isMapZoomed.value = !isMapZoomed.value;
};

// Watch for changes in isMapZoomed to control body scroll
watch(
    isMapZoomed,
    (newValue) => {
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
    document.body.style.overflow = "";
});
</script>

<template>
    <section id="contacts" class="w-full bg-white pt-[26px] pb-[2px]">
        <div class="mx-auto max-w-[1170px] px-4 md:px-6 lg:px-8">
            <!-- Заголовок секции -->
            <h2
                class="font-montserrat mb-8 text-center text-[32px] font-semibold text-[#2C2C2C] md:text-[42px]"
            >
                Контактная информация
            </h2>

            <!-- Контактная информация с картой -->
            <div
                class="mb-8 flex flex-col-reverse items-center gap-8 xl:flex-row xl:items-start xl:gap-23.5"
            >
                <!-- Левая колонка: Карта и FAQ -->
                <div
                    class="flex w-full flex-col items-center pt-0 pl-0 xl:w-auto xl:items-start xl:pt-2 xl:pl-2"
                >
                    <!-- Яндекс карта (original size) -->
                    <ContactMap @click="toggleMapZoom" class="cursor-pointer" />

                    <!-- FAQ секция (перемещена под карту) -->
                    <FaqAccordion :items="faqItems" id="faqs" />
                </div>

                <!-- Контактная информация (правая часть) -->
                <div class="mx-auto xl:mx-0 xl:w-[40%]">
                    <ContactDetails />
                </div>
            </div>
        </div>
    </section>

    <!-- Overlay for zoomed map -->
    <div
        v-if="isMapZoomed"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="toggleMapZoom"
    >
        <!-- Zoomed Map Container -->
        <div
            class="relative z-10 flex max-h-[90vh] w-[90vw] flex-col overflow-hidden rounded-3xl bg-white shadow-lg"
        >
            <!-- Close button for zoomed map -->
            <button
                @click="toggleMapZoom"
                class="absolute top-4 right-4 z-20 flex-shrink-0 rounded-full bg-white p-2 text-[#000000CC] transition-all duration-300 ease-in-out hover:scale-110 hover:text-gray-700 active:translate-y-0.5 active:scale-95"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
            <!-- ContactMap in zoomed state -->
            <ContactMap class="h-full w-full" />
        </div>
    </div>
</template>

<style scoped>
.text-blue-600 {
    color: #1882f0;
}

/* Стили для секции FAQ */
button:focus {
    outline: none;
}

.prose p {
    margin-bottom: 0.5rem;
}

/* No longer need .map-zoomed class for positioning,
   as the new overlay structure handles it with Tailwind classes. */
</style>

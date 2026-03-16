<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
import ContactMap from '@/components/molecules/ContactMap.vue';
import FaqAccordion from '@/components/molecules/FaqAccordion.vue';
import ContactDetails from '@/components/molecules/ContactDetails.vue';

const faqItems = [
    {
        question: 'Как рассчитать количество свай?',
        answer: 'Мы выезжаем на объект бесплатно, производим замеры и рассчитываем точное количество свай в зависимости от типа грунта и нагрузки строения.',
    },
    {
        question: 'За сколько дней монтируется фундамент?',
        answer: 'Стандартный фундамент из 10–12 свай устанавливается за 1 рабочий день. Крупные объекты — за 2–3 дня.',
    },
    {
        question: 'В какое время года можно монтировать сваи?',
        answer: 'Мы работаем круглый год при температуре от −40°C до +40°C. Винтовые сваи не требуют прогрева грунта.',
    },
    {
        question: 'Какая гарантия на работы?',
        answer: 'Мы даём гарантию на монтаж и материалы до 10 лет. Все условия фиксируются в договоре.',
    },
    {
        question: 'Как оформить заказ?',
        answer: 'Позвоните нам или оставьте заявку на сайте. Мы перезвоним, согласуем дату выезда и рассчитаем стоимость бесплатно.',
    },
];

const isMapZoomed = ref(false);

const toggleMapZoom = () => {
    isMapZoomed.value = !isMapZoomed.value;
};

watch(
    isMapZoomed,
    (newValue) => {
        if (newValue) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },
    { immediate: true },
);

onUnmounted(() => {
    document.body.style.overflow = '';
});
</script>

<template>
    <section id="contacts" class="w-full bg-white pt-[26px] pb-[2px]">
        <div class="mx-auto max-w-[1170px] px-4 md:px-6 lg:px-8">
            <h2
                class="font-montserrat mb-8 text-center text-[32px] font-semibold text-[#2C2C2C] md:text-[42px]"
            >
                Контактная информация
            </h2>

            <div
                class="mb-8 flex flex-col-reverse items-center gap-8 xl:flex-row xl:items-start xl:gap-23.5"
            >
                <!-- Левая колонка: Карта и FAQ -->
                <div
                    class="flex w-full flex-col items-center pt-0 pl-0 xl:w-auto xl:items-start xl:pt-2 xl:pl-2"
                >
                    <ContactMap @click="toggleMapZoom" class="cursor-pointer" />
                    <FaqAccordion :items="faqItems" id="faqs" />
                </div>

                <!-- Правая колонка: Контакты -->
                <div class="mx-auto xl:mx-0 xl:w-[40%]">
                    <ContactDetails />
                </div>
            </div>
        </div>
    </section>

    <!-- Оверлей увеличенной карты -->
    <div
        v-if="isMapZoomed"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click.self="toggleMapZoom"
    >
        <div
            class="relative z-10 flex max-h-[90vh] w-[90vw] flex-col overflow-hidden rounded-3xl bg-white shadow-lg"
        >
            <button
                @click="toggleMapZoom"
                class="absolute top-4 right-4 z-20 flex-shrink-0 rounded-full bg-white p-2 text-[#000000CC] transition-all duration-300 ease-in-out hover:scale-110 hover:text-gray-700 active:translate-y-0.5 active:scale-95"
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <ContactMap class="h-full w-full" />
        </div>
    </div>
</template>

<style scoped>
button:focus {
    outline: none;
}
</style>

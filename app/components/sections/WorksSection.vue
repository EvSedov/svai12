<script setup lang="ts">
import WorkCard from "@/components/WorkCard.vue";

const assetPath = usePublicAsset();

const works = [
    {
        id: 1,
        imageSrc: assetPath("/images/portfolio/work-1.jpg"),
        title: "СНТ, г. Казань, Республика Татарстан",
        description:
            "На опушке леса возле одного из СНТ (садоводческое некоммерческое товарищество), как грибы после дождя, прямо из под земли проявились металлические винтовые сваи. Синоптики сообщают, что причиной послужил снегопад, прошедший накануне ночью... Однако менеджеры компании СВАИ+ подсказывают, что это всего лишь качественная и быстрая работа их мастеров, для которых осадки - не проблема!",
    },
    {
        id: 2,
        imageSrc: assetPath("/images/portfolio/work-2.jpg"),
        title: "СНТ, г. Казань, Республика Татарстан",
        description:
            "На опушке леса возле одного из СНТ (садоводческое некоммерческое товарищество), как грибы после дождя, прямо из под земли проявились металлические винтовые сваи. Синоптики сообщают, что причиной послужил снегопад, прошедший накануне ночью... Однако менеджеры компании СВАИ+ подсказывают, что это всего лишь качественная и быстрая работа их мастеров, для которых осадки - не проблема!",
    },
    {
        id: 3,
        imageSrc: assetPath("/images/portfolio/work-3.jpg"),
        title: "СНТ, г. Казань, Республика Татарстан",
        description:
            "На опушке леса возле одного из СНТ (садоводческое некоммерческое товарищество), как грибы после дождя, прямо из под земли проявились металлические винтовые сваи. Синоптики сообщают, что причиной послужил снегопад, прошедший накануне ночью... Однако менеджеры компании СВАИ+ подсказывают, что это всего лишь качественная и быстрая работа их мастеров, для которых осадки - не проблема!",
    }
];
</script>

<template>
    <section class="bg-bg-main px-4 py-18 md:px-6 md:py-22 lg:px-8 lg:py-26">
        <div class="mx-auto max-w-395">
            <h2
                class="mb-12 text-center font-montserrat text-hero-title-tablet font-semibold leading-8 tracking-[0.02em] text-black md:mb-16 md:text-hero-title-desktop">
                Примеры <span class="text-brand">работ</span>
            </h2>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <WorkCard v-for="work in works" :key="work.id" :image-src="work.imageSrc" :title="work.title"
                    :description="work.description" />
            </div>
        </div>
    </section>
</template>

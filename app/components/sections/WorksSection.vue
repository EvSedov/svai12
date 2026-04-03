<script setup lang="ts">
import { ref, watch, onUnmounted } from "vue";
import WorkCard from "@/components/WorkCard.vue";

const assetPath = usePublicAsset();

const works = [
    {
        id: 1,
        imageSrc: assetPath("/images/examples/photo_01.jpg"),
        title: "д. Сенькино, Респ. Марий Эл",
    },
    {
        id: 2,
        imageSrc: assetPath("/images/examples/photo_02.jpg"),
        title: "г. Казань, КП «Моё Царицыно»",
    },
    {
        id: 3,
        imageSrc: assetPath("/images/examples/photo_03.jpg"),
        title: "г. Чебоксары, СНТ «Олимпийский»",
    },
    {
        id: 4,
        imageSrc: assetPath("/images/examples/photo_04.jpg"),
        title: "с. Кокшайск, Респ. Марий Эл",
    },
    {
        id: 5,
        imageSrc: assetPath("/images/examples/photo_05.jpg"),
        title: "п. Руэм, Респ. Марий Эл",
    },
];

const activeWork = ref<(typeof works)[number] | null>(null);

const openWork = (work: (typeof works)[number]) => {
    activeWork.value = work;
};

const closeWork = () => {
    activeWork.value = null;
};

watch(
    activeWork,
    (newValue) => {
        if (!import.meta.client) return;
        document.body.style.overflow = newValue ? "hidden" : "";
    },
    { immediate: true },
);

onUnmounted(() => {
    if (!import.meta.client) return;
    document.body.style.overflow = "";
});
</script>

<template>
    <section id="portfolio" class="bg-white px-4 pt-18 pb-12.5 md:px-6 md:pt-22 md:pb-12.5 lg:px-8 lg:pt-26 lg:pb-12.5">
        <div class="mx-auto max-w-395">
            <h2
                class="mb-12 text-center font-montserrat text-hero-title-tablet font-semibold leading-8 tracking-[0.02em] text-black md:mb-16 md:text-hero-title-desktop">
                Примеры <span class="text-brand">работ</span>
            </h2>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <WorkCard
                    v-for="work in works"
                    :key="work.id"
                    :image-src="work.imageSrc"
                    :title="work.title"
                    @open="openWork(work)"
                />
            </div>
        </div>

        <div
            v-if="activeWork"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            @click.self="closeWork"
        >
            <div class="relative h-[calc(100vh-2rem)] w-[calc(100vw-2rem)]">
                <button
                    class="absolute top-2 right-2 z-10 rounded-full bg-transparent p-2 text-content-primary transition-transform duration-200 hover:scale-105 md:top-3 md:right-3"
                    @click="closeWork"
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

                <div class="flex h-full flex-col overflow-hidden rounded-[18px] bg-white shadow-2xl">
                    <div class="min-h-0 flex-1 p-3 pt-14 md:p-4 md:pt-14">
                        <img
                            :src="activeWork.imageSrc"
                            :alt="activeWork.title"
                            class="h-full w-full rounded-[10px] object-contain bg-bg-main"
                        />
                    </div>

                    <div class="border-t border-black/5 px-5 py-4 md:px-6">
                        <p class="mb-1 text-3.5 font-semibold tracking-[0.12em] text-brand uppercase">
                            Адрес
                        </p>
                        <p class="font-montserrat text-5 leading-snug font-semibold text-black/80">
                            {{ activeWork.title }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

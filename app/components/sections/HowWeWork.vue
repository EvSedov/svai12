<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { debounce } from "lodash-es";

const assetPath = usePublicAsset();
const whiteCardRef = ref<HTMLElement | null>(null);
const whiteCardHeight = ref<number>(0);
const whiteCardWidth = ref<number>(0);
let resizeObserver: ResizeObserver | null = null;

const containerMinHeight = computed(() => {
    const paddingY = 180;

    return `${whiteCardHeight.value - paddingY}px`;
});
const containerWidth = computed(() => {
    return `${whiteCardWidth.value}px`;
});
const handleResize = debounce((entries) => {
    for (let entry of entries) {
        if (entry.target === whiteCardRef.value) {
            whiteCardHeight.value = entry.contentRect.height;
            whiteCardWidth.value = entry.contentRect.width;
        }
    }
}, 100);

onMounted(() => {
    if (whiteCardRef.value) {
        resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(whiteCardRef.value);
    }
});

onBeforeUnmount(() => {
    if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
    }
});
</script>

<template>
    <div class="h-auto bg-brand">
        <div class="relative mx-auto" :style="{
            minHeight: containerMinHeight,
            width: containerWidth,
        }">
            <div id="how-we-work" ref="whiteCardRef"
                class="absolute -top-30 flex max-w-291.5 flex-col items-center gap-10 rounded-md bg-white px-4 py-9 shadow-lg md:px-8 xl:px-4">
                <div class="flex w-full flex-col gap-8 xl:max-w-286">
                    <div class="flex w-full flex-col gap-8 xl:flex-row xl:items-start xl:justify-between xl:gap-10">
                        <div
                            class="font-montserrat flex max-w-156 flex-col gap-1 text-left text-4.5 leading-none font-medium tracking-[0.02em] text-black/60">
                            <h2
                                class="mb-4 text-center text-3xl font-bold text-black sm:text-4xl md:mb-5 md:text-[42px]">
                                О нас
                            </h2>
                            <p>
                                <span class="font-bold text-black">Мы</span>
                                — команда специалистов по монтажу винтовых свай с опытом работы
                                <span class="font-bold text-black underline">более 15 лет.</span>
                            </p>
                            <p>
                                За это время реализованы
                                <span class="font-bold text-black">сотни проектов:</span>
                                от частных домов и бань до коммерческих объектов, заборов, террас и промышленных
                                конструкций.
                            </p>
                            <p>
                                Мы работаем с разными типами грунта и подбираем техническое решение индивидуально под
                                каждый объект. Используем проверенные материалы, современное оборудование и строго
                                соблюдаем технологию монтажа, чтобы ваш фундамент служил десятилетиями без просадок и
                                перекосов.
                            </p>
                            <p>
                                <span class="font-bold text-black">Наша цель</span>
                                — не просто установить сваи, а
                                <span class="font-bold text-black">обеспечить вам надежное основание,</span>
                                на котором можно строить уверенно и без лишних затрат.
                            </p>
                        </div>

                        <div
                            class="mx-auto w-full max-w-105 overflow-hidden rounded-md border border-black/8 bg-neutral-100 xl:mx-0 xl:w-105 xl:shrink-0">
                            <img :src="assetPath('/images/people-working.jpg')" alt="Монтаж винтовых свай"
                                class="h-full w-full object-cover" />
                        </div>
                    </div>
                </div>

                <div class="mt-10 flex w-full flex-col gap-10">
                    <h2 class="text-center text-3xl font-bold text-wrap text-black sm:text-4xl md:text-[42px]">
                        Что вы получаете работая с нами?
                    </h2>
                    <div
                        class="grid grid-cols-[362px] justify-center md:grid-cols-[362px_362px] md:gap-5 xl:grid-cols-[362px_362px_362px]">
                        <div class="flex h-36 w-90.5 flex-col items-center justify-between px-16">
                            <img :src="assetPath('/icons/container-1.png')"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать" />

                            <p class="text-center text-base text-black/80">
                                Точный расчёт и проектирование
                            </p>
                        </div>
                        <div class="flex h-36 w-90.5 flex-col items-center justify-between px-8">
                            <img :src="assetPath('/icons/container-2.png')"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать" />

                            <p class="text-center text-base text-black/80">
                                Быстрые сроки монтажа

                            </p>
                        </div>
                        <div class="flex h-36 w-90.5 flex-col items-center justify-between px-10">
                            <img :src="assetPath('/icons/container-3.png')"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать" />

                            <p class="text-center text-base text-black/80">
                                Прозрачная стоимость
                            </p>
                        </div>

                        <div class="flex h-36 w-90.5 flex-col items-center justify-between px-18">
                            <img :src="assetPath('/icons/container-4.png')"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать" />

                            <p class="text-center text-base text-black/80">
                                Современное<br />
                                оборудование
                            </p>
                        </div>
                        <div class="flex h-36 w-90.5 flex-col items-center justify-between px-8">
                            <img :src="assetPath('/icons/container-5.png')"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать" />

                            <p class="text-center text-base text-black/80">
                                Гарантия качества и<br />
                                надёжность
                            </p>
                        </div>
                        <div class="flex h-36 w-90.5 flex-col items-center justify-between px-10">
                            <img :src="assetPath('/icons/container-6.png')"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать" />

                            <p class="text-center text-base text-black/80">
                                Монтаж в любое<br />
                                время года
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>

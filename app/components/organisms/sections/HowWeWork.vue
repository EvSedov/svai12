<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from 'vue';
import { debounce } from 'lodash-es';

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
        <div
            class="relative mx-auto"
            :style="{
                minHeight: containerMinHeight,
                width: containerWidth,
            }"
        >
            <div
                id="how-we-work"
                ref="whiteCardRef"
                class="absolute top-[-120px] flex max-w-[1166px] flex-col items-center gap-4 rounded-md bg-white py-9 shadow-lg"
            >
                <div class="flex flex-col">
                    <h2
                        class="mb-10 text-center text-3xl font-bold text-wrap text-black sm:text-4xl md:text-[42px]"
                    >
                        Как мы работаем?
                    </h2>
                    <div
                        class="grid grid-cols-[276px] justify-center md:grid-cols-[276px_276px] md:gap-4 xl:grid-cols-[276px_276px_276px_276px]"
                    >
                        <div
                            v-for="(step, i) in [
                                'Оставляете заявку на сайте или звоните нам',
                                'Выезжаем на объект, производим замеры и расчёт',
                                'Заключаем договор с фиксированной стоимостью',
                                'Монтируем сваи в согласованные сроки с гарантией',
                            ]"
                            :key="i"
                            class="relative flex h-[196px] w-[276px] flex-col items-center justify-center"
                        >
                            <div
                                class="absolute top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand"
                            >
                                <span class="text-2xl/[28px] text-white">{{ i + 1 }}</span>
                            </div>
                            <div
                                class="flex h-[136px] w-[228px] items-start justify-center rounded-3xl pt-14 shadow-md"
                            >
                                <span class="text-center text-sm/relaxed text-black/80">{{ step }}</span>
                            </div>
                        </div>
                    </div>
                    <span class="text-center text-sm font-semibold text-black">
                        * Оплата осуществляется после согласования и подписания договора
                    </span>
                </div>

                <div class="mt-10 flex w-full flex-col gap-10">
                    <h2
                        class="text-center text-3xl font-bold text-wrap text-black sm:text-4xl md:text-[42px]"
                    >
                        Что вы получаете работая с нами?
                    </h2>
                    <div
                        class="grid grid-cols-[362px] justify-center md:grid-cols-[362px_362px] md:gap-5 xl:grid-cols-[362px_362px_362px]"
                    >
                        <div
                            v-for="(benefit, i) in [
                                { icon: '/images/icons/benefit-1.svg', text: 'Точный расчёт нагрузки на основание' },
                                { icon: '/images/icons/benefit-2.svg', text: 'Монтаж фундамента за один рабочий день' },
                                { icon: '/images/icons/benefit-3.svg', text: 'Прозрачные цены без скрытых доплат' },
                                { icon: '/images/icons/benefit-4.svg', text: 'Современное профессиональное оборудование' },
                                { icon: '/images/icons/benefit-5.svg', text: 'Гарантия на работы и материалы до 10 лет' },
                                { icon: '/images/icons/benefit-6.svg', text: 'Работаем в любое время года при −40°C' },
                            ]"
                            :key="i"
                            class="flex h-[144px] w-[362px] flex-col items-center justify-between px-10"
                        >
                            <img
                                :src="benefit.icon"
                                alt="Иконка преимущества"
                            />
                            <p class="text-center text-base text-black/80">{{ benefit.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

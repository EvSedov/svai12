<script setup lang="ts">
import { ref, onMounted, computed, onBeforeUnmount } from "vue";
import { debounce } from "lodash-es";

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
    <div class="h-auto bg-[#1882F0]">
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
                            class="relative flex h-[196px] w-[276px] flex-col items-center justify-center"
                        >
                            <div
                                class="absolute top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1882F0]"
                            >
                                <span class="text-2xl/[28px] text-white"
                                    >1</span
                                >
                            </div>
                            <div
                                class="flex h-[136px] w-[228px] items-start justify-center rounded-3xl pt-14 shadow-md"
                            >
                                <span
                                    class="text-center text-sm/relaxed text-black/80"
                                    >Оставляете заявку <br />
                                    на сайте/звоните или пишите на прямую</span
                                >
                            </div>
                        </div>
                        <div
                            class="relative flex h-[196px] w-[276px] flex-col items-center justify-center"
                        >
                            <div
                                class="absolute top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1882F0]"
                            >
                                <span class="text-2xl/[28px] text-white"
                                    >2</span
                                >
                            </div>
                            <div
                                class="flex h-[136px] w-[228px] items-start justify-center rounded-3xl pt-14 shadow-md"
                            >
                                <span
                                    class="text-center text-sm/relaxed text-black/80"
                                    >Обговариваем нюансы, согласовываем макеты и
                                    сроки
                                </span>
                            </div>
                        </div>
                        <div
                            class="relative flex h-[196px] w-[276px] flex-col items-center justify-center"
                        >
                            <div
                                class="absolute top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1882F0]"
                            >
                                <span class="text-2xl/[28px] text-white"
                                    >3</span
                                >
                            </div>
                            <div
                                class="flex h-[136px] w-[228px] items-start justify-center rounded-3xl pt-14 shadow-md"
                            >
                                <span
                                    class="text-center text-sm/relaxed text-black/80"
                                    >Мы сообщаем о готовности</span
                                >
                            </div>
                        </div>
                        <div
                            class="relative flex h-[196px] w-[276px] flex-col items-center justify-center"
                        >
                            <div
                                class="absolute top-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1882F0]"
                            >
                                <span class="text-2xl/[28px] text-white"
                                    >4</span
                                >
                            </div>
                            <div
                                class="flex h-[136px] w-[228px] items-start justify-center rounded-3xl pt-14 shadow-md"
                            >
                                <span
                                    class="text-center text-sm/relaxed text-black/80"
                                    >Вы забираете готовый заказ в офисе /
                                    оформляем доставку</span
                                >
                            </div>
                        </div>
                    </div>
                    <span class="text-center text-sm font-semibold text-black"
                        >* Оплата осуществляется на стадии согласования
                        макета</span
                    >
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
                            class="flex h-[144px] w-[362px] flex-col items-center justify-between px-16"
                        >
                            <img
                                src="/public/icons/container-1.png"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать"
                            />

                            <p class="text-center text-base text-black/80">
                                Библиотека компонентов и дизайнерских бумаг
                            </p>
                        </div>
                        <div
                            class="flex h-[144px] w-[362px] flex-col items-center justify-between px-8"
                        >
                            <img
                                src="/public/icons/container-2.png"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать"
                            />

                            <p class="text-center text-base text-black/80">
                                Прозрачные цены без скрытых коммиссий и переплат
                            </p>
                        </div>
                        <div
                            class="flex h-[144px] w-[362px] flex-col items-center justify-between px-10"
                        >
                            <img
                                src="/public/icons/container-3.png"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать"
                            />

                            <p class="text-center text-base text-black/80">
                                Собственное производство и студия дизайна
                            </p>
                        </div>

                        <div
                            class="flex h-[144px] w-[362px] flex-col items-center justify-between px-18"
                        >
                            <img
                                src="/public/icons/container-4.png"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать"
                            />

                            <p class="text-center text-base text-black/80">
                                Доставка в <br />
                                любую точку России
                            </p>
                        </div>
                        <div
                            class="flex h-[144px] w-[362px] flex-col items-center justify-between px-8"
                        >
                            <img
                                src="/public/icons/container-5.png"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать"
                            />

                            <p class="text-center text-base text-black/80">
                                Скидки для рекламных <br />
                                агентств и
                                <span class="underline"
                                    >постоянных клиентов</span
                                >
                            </p>
                        </div>
                        <div
                            class="flex h-[144px] w-[362px] flex-col items-center justify-between px-10"
                        >
                            <img
                                src="/public/icons/container-6.png"
                                alt="Иконка с нашими преимуществами о том почему нужно с нами сотрудничать"
                            />

                            <p class="text-center text-base text-black/80">
                                Любые способы оплаты заказов
                                <span class="text-[#1882F0]/45"
                                    >(даже натурой)</span
                                >
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped></style>

<script lang="ts" setup>
import { Button } from "@/Components/atoms/ui/button";
import ArrowRight from "@/Components/atoms/icons/ArrowRight.vue";
import { inject } from "vue";

const openOrderModal = inject("openOrderModal") as () => void;
</script>

<template>
    <section class="hero h-[1046px] w-full">
        <div class="mx-auto flex max-w-[1178px] justify-between pl-2.5">
            <div class="content">
                <div class="breadcrumpb h-[50px]"></div>
                <h2
                    class="mb-14 max-w-[676px] text-[54px]/[60px] font-bold tracking-wider"
                >
                    Печать на <span class="text-[#1882F0]">мужских</span> и
                    <span class="text-[#F37B90]">женских</span> футболках
                </h2>
                <ul
                    class="mb-24 max-w-[640px] text-[22px]/[26px] tracking-normal text-black/65"
                >
                    <li>
                        <span class="font-bold text-[#1882F0]">&check;</span>
                        Футболки из качественных материалов (хлопок 100%)
                    </li>
                    <li>
                        <span class="font-bold text-[#1882F0]">&check;</span>
                        Гипоаллергенная DTF-печать на современном check
                        оборудовании
                    </li>
                    <li>
                        <span class="font-bold text-[#1882F0]">&check;</span>
                        Максимальная площадь запечатки 300х400 мм
                    </li>
                    <li>
                        <span class="font-bold text-[#1882F0]">&check;</span>
                        Нанесение принта на грудь или спину футболки
                    </li>
                    <li>
                        <span class="font-bold text-[#1882F0]">&check;</span>
                        Заказ от 1 шт до любого тиража для физ. и юр. лиц
                    </li>
                    <li>
                        <span class="font-bold text-[#1882F0]">&check;</span>
                        Онлайн-конструктор футболок и расчет цены в пару кликов
                    </li>
                    <li>
                        <span class="font-bold text-[#1882F0]">&check;</span>
                        Печать за 1-2 рабочих дня и доставка по Москве и России
                    </li>
                </ul>
                <Button
                    class="h-15 border-2 border-[#BA2150] bg-linear-to-r from-[#F10488] to-[#FF0224] py-5.5 pr-8 pl-9 tracking-widest text-white uppercase"
                    @click="openOrderModal"
                >
                    Сделать заказ
                    <ArrowRight class="h-3.8 ml-4.5 w-4.75" />
                </Button>
            </div>
            <div
                class="relative rounded-b-xl bg-linear-to-r from-[#E2E9F1] to-[#E2E9EF] pt-2 pb-16.5"
            >
                <h3
                    class="text-[70px]/[72px] font-semibold tracking-wider text-[#A3AFBC]/35"
                >
                    ФУТБОЛКИ
                </h3>
                <Button
                    class="mt-[194px] mr-5 ml-5 flex h-18 border-dashed border-[#0034B0] bg-transparent p-6 pr-4.5 pl-10.5 text-[19px]/[21px] font-semibold text-black"
                    variant="outline"
                >
                    Узнать подробнее
                    <ArrowRight class="ml-8 h-3.75 w-4.25 invert" />
                </Button>
                <img
                    src="/resources/images/products/hero-t-shirt.png"
                    alt="Футболка"
                    class="absolute top-42 left-19 scale-118!"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
h3 {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
}
</style>

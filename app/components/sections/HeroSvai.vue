<script lang="ts" setup>
import { inject } from "vue";
import Button from "@/components/ui/button/Button.vue";
import ArrowRight from "@/components/icons/ArrowRight.vue";
import PhoneArrowDownLeft from "@/components/icons/PhoneArrowDownLeft.vue";

const openOrderModal = inject("openOrderModal") as () => void;
const assetPath = usePublicAsset();
const heroImage = assetPath("/images/hero-bg.jpg");
</script>

<template>
    <section id="hero"
        class="relative min-h-150 nw-full overflow-hidden pt-12 pb-20 lg:pt-16 xl:min-h-205 xl:pt-10 xl:pb-28 bg-white"
        :style="{
            '--hero-bg-image': `url(${heroImage})`,
        }">
        <div class="mx-auto max-w-395 px-4 md:px-6 lg:px-8">
            <div
                class="relative z-10 flex w-full flex-col items-start gap-8 text-left xl:min-h-120.75 xl:max-w-211 xl:gap-8.75 xl:pt-14">
                <h1
                    class="font-montserrat text-hero-title-mobile font-bold tracking-normal text-black sm:text-hero-title-tablet lg:text-hero-title-desktop">
                    <span class="text-brand">Винтовые сваи</span>
                    <span class="text-black"> — надежный фундамент вашего объекта</span>
                </h1>

                <div class="font-montserrat space-y-6 text-hero-body font-medium tracking-normal text-black/60">
                    <p>
                        <span class="font-bold text-brand">Винтовые сваи</span>
                        — это
                        <span class="font-bold text-black">современное и технологичное</span>
                        решение для устройства фундамента на различных типах
                        грунта. Они обеспечивают
                        <span class="font-bold text-brand">высокую несущую способность, устойчивость конструкции
                            и долгий срок</span>
                        службы даже в сложных условиях эксплуатации.
                    </p>
                    <p>
                        Монтаж винтовых свай выполняется без масштабных земляных
                        работ, что значительно сокращает сроки строительства и
                        снижает затраты. Установка возможна в любое время года,
                        включая зимний период, а готовый фундамент сразу готов к
                        дальнейшему строительству.
                    </p>
                </div>

                <div class="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
                    <Button
                        class="h-14 rounded-hero-cta border-2 border-brand-border bg-brand px-7 text-hero-cta font-semibold tracking-hero-cta-primary text-white uppercase shadow-lg transition-all duration-300 hover:bg-brand-border sm:px-8"
                        @click="openOrderModal">
                        Сделать заказ
                        <ArrowRight class="ml-4 h-4 w-4" />
                    </Button>

                    <span class="hidden text-hero-or font-medium text-black/35 sm:inline-flex">
                        или
                    </span>

                    <Button variant="outline"
                        class="h-14 rounded-hero-cta border-2 border-brand bg-white px-6 text-hero-cta font-semibold tracking-hero-cta-secondary text-brand shadow-none transition-all duration-300 hover:bg-brand-light hover:text-brand sm:px-7"
                        @click="openOrderModal">
                        Заказать обратный звонок
                        <span class="ml-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand">
                            <PhoneArrowDownLeft class="h-3 w-3" />
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
@media (min-width: 1280px) {
    #hero {
        background-image: var(--hero-bg-image);
        background-repeat: no-repeat;
        background-position: right top;
        background-size: auto 100%;
    }
}
</style>

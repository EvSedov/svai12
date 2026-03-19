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
        class="relative min-h-132 w-full overflow-hidden pt-10 pb-8 sm:min-h-140 sm:pt-12 sm:pb-8 md:pb-52 lg:min-h-155 lg:pt-16 lg:pb-46 xl:min-h-205 xl:pt-10 xl:pb-28"
        :style="{
            '--hero-bg-image': `url(${heroImage})`,
        }">
        <div class="mx-auto w-full px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12">
            <div
                class="hero-content relative z-10 flex w-full flex-col items-start gap-6 text-left sm:gap-7 lg:max-w-135 lg:pt-6 xl:max-w-165 xl:gap-8.75 xl:pt-10 2xl:max-w-180">
                <h1
                    class="hero-title font-montserrat max-w-86 text-hero-title-mobile font-bold tracking-normal text-black sm:max-w-125 sm:text-hero-title-tablet lg:max-w-145 xl:max-w-190 lg:text-hero-title-desktop">
                    <span class="text-brand">Винтовые сваи</span>
                    <span class="text-black">&nbsp;— надежный фундамент вашего объекта</span>
                </h1>

                <div
                    class="hero-copy font-montserrat max-w-86 space-y-5 text-hero-body-mobile font-medium tracking-normal text-black/60 sm:max-w-125 sm:space-y-6 sm:text-hero-body-tablet lg:max-w-150 lg:text-hero-body-desktop xl:max-w-175">
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

                <div
                    class="flex w-full max-w-110 flex-col gap-3 sm:max-w-none sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                    <Button
                        class="h-14 w-full justify-center rounded-hero-cta border-2 border-brand-border bg-brand px-5 text-center text-hero-cta-mobile font-semibold tracking-hero-cta-primary text-white uppercase shadow-lg transition-all duration-300 hover:bg-brand-border sm:w-auto sm:px-8 sm:text-hero-cta-desktop"
                        @click="openOrderModal">
                        Сделать заказ
                        <ArrowRight class="ml-4 h-4 w-4" />
                    </Button>

                    <span
                        class="hidden text-hero-or-tablet font-medium text-black/35 sm:inline-flex lg:text-hero-or-desktop">
                        или
                    </span>

                    <Button variant="outline"
                        class="h-14 w-full justify-center rounded-hero-cta border-2 border-brand bg-white px-5 text-center text-hero-cta-mobile font-semibold tracking-hero-cta-secondary text-brand shadow-none transition-all duration-300 hover:bg-brand-light hover:text-brand sm:w-auto sm:px-7 sm:text-hero-cta-desktop"
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
#hero {
    background-color: var(--color-background);
    background-image: var(--hero-bg-image);
    background-repeat: no-repeat;
    background-position: right top;
    background-size: auto 100%;
}

.hero-content {
    isolation: isolate;
}

.hero-content::before {
    content: "";
    position: absolute;
    inset: -1rem -1rem -1.5rem -1rem;
    z-index: -1;
    border-radius: 0.5rem;
    background:
        linear-gradient(90deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.88) 58%, rgba(255, 255, 255, 0.28) 100%);
    backdrop-filter: opacity(50%) blur(6px);
    -webkit-backdrop-filter: opacity(50%) blur(6px);
    pointer-events: none;
}

@media (min-width: 1024px) {

    .hero-title,
    .hero-copy {
        text-shadow: 0 2px 14px rgba(255, 255, 255, 0.72);
    }
}
</style>

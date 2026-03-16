<script setup lang="ts">
useHead({
    title: 'Свай12 — Винтовые сваи в Республике Марий Эл',
    meta: [
        {
            name: 'description',
            content: 'Профессиональный монтаж винтовых свай. Надёжный фундамент для дома, бани, забора. Точный расчёт, быстрые сроки, гарантия качества.',
        },
    ],
})
</script>

<template>
    <div>
        <!-- Hero: изображение public/images/hero-bg.jpg -->
        <section
            id="hero"
            class="relative min-h-[480px] lg:min-h-[560px] flex items-center bg-content-primary bg-cover bg-center"
            style="background-image: url('/images/hero-bg.jpg')"
        >
            <!-- Оверлей -->
            <div class="absolute inset-0 bg-content-primary/70" />

            <div class="relative container mx-auto px-4 py-20">
                <div class="max-w-2xl">
                    <h1 class="text-3xl lg:text-5xl font-bold leading-tight text-white mb-6">
                        Винтовые сваи —<br>
                        <span class="text-brand">надежный фундамент</span><br>
                        вашего объекта
                    </h1>
                    <p class="text-lg text-white/70 mb-8 leading-relaxed">
                        Профессиональный монтаж для домов, бань, заборов, причалов
                        и любых строений. Республика Марий Эл и соседние регионы.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a href="tel:+79021091101"
                            class="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold px-6 py-3 rounded-md transition-colors">
                            Позвонить нам
                        </a>
                        <NuxtLink to="/catalog"
                            class="inline-flex items-center gap-2 border border-white/30 hover:border-brand hover:text-brand text-white font-semibold px-6 py-3 rounded-md transition-colors">
                            Каталог свай
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Как мы работаем + преимущества -->
        <OrganismsSectionsHowWeWork />

        <!-- Портфолио -->
        <OrganismsSectionsPortfolio />

        <!-- Контакты + FAQ -->
        <OrganismsSectionsContactInfo />

        <!-- CTA-полоса -->
        <section class="bg-brand py-12">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-2xl lg:text-3xl font-bold text-white mb-4">
                    Нужен расчёт стоимости?
                </h2>
                <p class="text-white/80 mb-8 max-w-md mx-auto">
                    Позвоните или оставьте заявку — рассчитаем точную стоимость для вашего объекта бесплатно.
                </p>
                <a href="tel:+79021091101"
                    class="inline-flex items-center gap-2 bg-white hover:bg-white/90 text-brand font-bold px-8 py-3 rounded-md transition-colors text-lg">
                    +7 (902) 109-11-01
                </a>
            </div>
        </section>
    </div>
</template>

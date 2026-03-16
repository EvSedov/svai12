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

const benefits = [
    { title: 'Точный расчёт', desc: 'Бесплатный выезд геодезиста и расчёт нагрузки на основание' },
    { title: 'Быстрые сроки', desc: 'Монтаж фундамента из 10 свай за 1 рабочий день' },
    { title: 'Прозрачная стоимость', desc: 'Фиксированная цена в договоре без скрытых доплат' },
    { title: 'Современное оборудование', desc: 'Профессиональная техника для точного монтажа свай' },
    { title: 'Гарантия качества', desc: 'Гарантия на все виды работ и материалы до 10 лет' },
    { title: 'Монтаж в любое время года', desc: 'Работаем при температуре от −40°C до +40°C' },
]
</script>

<template>
    <div>
        <!-- Hero -->
        <section class="bg-content-primary text-white py-20 lg:py-32">
            <div class="container mx-auto px-4">
                <div class="max-w-2xl">
                    <h1 class="text-3xl lg:text-5xl font-bold leading-tight mb-6">
                        Винтовые сваи —<br>
                        <span class="text-brand">надежный фундамент</span><br>
                        вашего объекта
                    </h1>
                    <p class="text-lg text-white/70 mb-8 leading-relaxed">
                        Профессиональный монтаж для домов, бань, заборов, причалов
                        и любых строений. Республика Марий Эл и соседние регионы.
                    </p>
                    <div class="flex flex-wrap gap-4">
                        <a
                            href="tel:+79021091101"
                            class="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold px-6 py-3 rounded-md transition-colors"
                        >
                            Позвонить нам
                        </a>
                        <NuxtLink
                            to="/catalog"
                            class="inline-flex items-center gap-2 border border-white/30 hover:border-brand hover:text-brand text-white font-semibold px-6 py-3 rounded-md transition-colors"
                        >
                            Каталог свай
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section>

        <!-- Benefits -->
        <section class="py-16 lg:py-24 bg-bg-white">
            <div class="container mx-auto px-4">
                <h2 class="text-2xl lg:text-3xl font-bold text-content-primary text-center mb-12">
                    Что вы получаете
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        v-for="item in benefits"
                        :key="item.title"
                        class="p-6 rounded-xl border border-border-light hover:border-brand hover:shadow-sm transition-all"
                    >
                        <div class="w-8 h-1 bg-brand rounded mb-4" />
                        <h3 class="text-base font-semibold text-content-primary mb-2">{{ item.title }}</h3>
                        <p class="text-sm text-content-secondary leading-relaxed">{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="py-16 bg-brand-light">
            <div class="container mx-auto px-4 text-center">
                <h2 class="text-2xl lg:text-3xl font-bold text-content-primary mb-4">
                    Нужен расчёт стоимости?
                </h2>
                <p class="text-content-secondary mb-8 max-w-md mx-auto">
                    Оставьте заявку — мы перезвоним и рассчитаем точную стоимость для вашего объекта бесплатно.
                </p>
                <a
                    href="tel:+79021091101"
                    class="inline-flex items-center gap-2 bg-brand hover:bg-brand/90 text-white font-semibold px-8 py-3 rounded-md transition-colors text-lg"
                >
                    +7 (902) 109-11-01
                </a>
            </div>
        </section>
    </div>
</template>

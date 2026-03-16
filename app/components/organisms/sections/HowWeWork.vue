<script setup lang="ts">
const steps = [
    { n: 1, text: 'Оставляете заявку на сайте или звоните нам' },
    { n: 2, text: 'Выезжаем на объект, производим замеры и расчёт' },
    { n: 3, text: 'Заключаем договор с фиксированной стоимостью' },
    { n: 4, text: 'Монтируем сваи в согласованные сроки с гарантией' },
]

const benefits = [
    { icon: '/images/icons/benefit-1.svg', text: 'Точный расчёт\nнагрузки на основание' },
    { icon: '/images/icons/benefit-2.svg', text: 'Монтаж за\nодин рабочий день' },
    { icon: '/images/icons/benefit-3.svg', text: 'Прозрачная стоимость\nбез скрытых доплат' },
    { icon: '/images/icons/benefit-4.svg', text: 'Современное\nоборудование' },
    { icon: '/images/icons/benefit-5.svg', text: 'Гарантия качества\nдо 10 лет' },
    { icon: '/images/icons/benefit-6.svg', text: 'Работаем\nв любое время года' },
]
</script>

<template>
    <section id="how-we-work" class="bg-bg-white py-16 lg:py-24">
        <div class="mx-auto max-w-[1166px] px-4">

            <!-- Как мы работаем -->
            <h2 class="mb-12 text-center text-3xl font-bold text-content-primary sm:text-4xl">
                Как мы работаем?
            </h2>

            <div class="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 xl:grid-cols-4 mb-6">
                <div
                    v-for="step in steps"
                    :key="step.n"
                    class="relative flex flex-col items-center"
                >
                    <!-- Номер -->
                    <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand mb-4 shrink-0">
                        <span class="text-2xl font-bold text-white">{{ step.n }}</span>
                    </div>
                    <!-- Карточка -->
                    <div class="w-full rounded-2xl shadow-sm border border-border-light px-6 py-5 text-center">
                        <p class="text-sm leading-relaxed text-text-dark">{{ step.text }}</p>
                    </div>
                </div>
            </div>

            <p class="text-center text-sm font-semibold text-content-primary mb-16">
                * Оплата осуществляется после согласования и подписания договора
            </p>

            <!-- Что вы получаете -->
            <h2 class="mb-12 text-center text-3xl font-bold text-content-primary sm:text-4xl">
                Что вы получаете работая с нами?
            </h2>

            <div class="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <div
                    v-for="benefit in benefits"
                    :key="benefit.text"
                    class="flex flex-col items-center gap-4 px-8 py-6"
                >
                    <img
                        :src="benefit.icon"
                        :alt="benefit.text"
                        class="h-16 w-16 object-contain"
                    />
                    <p class="text-center text-base text-text-dark whitespace-pre-line">{{ benefit.text }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
interface PortfolioItem {
    id: number
    title: string
    image: string
}

// Изображения: public/images/portfolio/work-1.jpg ... work-N.jpg
const items: PortfolioItem[] = [
    { id: 1, title: 'Фундамент жилого дома', image: '/images/portfolio/work-1.jpg' },
    { id: 2, title: 'Фундамент для бани', image: '/images/portfolio/work-2.jpg' },
    { id: 3, title: 'Свайный фундамент для забора', image: '/images/portfolio/work-3.jpg' },
    { id: 4, title: 'Причал на винтовых сваях', image: '/images/portfolio/work-4.jpg' },
    { id: 5, title: 'Терраса и крыльцо', image: '/images/portfolio/work-5.jpg' },
    { id: 6, title: 'Хозяйственная постройка', image: '/images/portfolio/work-6.jpg' },
]
</script>

<template>
    <section id="portfolio" class="bg-bg-main py-16 lg:py-24">
        <div class="mx-auto max-w-[1590px] px-4">
            <h2 class="mb-12 text-center text-3xl font-bold text-content-primary sm:text-4xl">
                Примеры наших работ
            </h2>

            <div class="flex flex-wrap justify-center gap-5">
                <div
                    v-for="item in items"
                    :key="item.id"
                    class="relative h-72 w-72 overflow-hidden rounded-xl bg-border-light"
                    :style="{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
                >
                    <div class="absolute inset-0 flex items-end bg-linear-to-t from-black/60 to-transparent">
                        <p class="mb-4 ml-4 text-base font-semibold text-white drop-shadow">
                            {{ item.title }}
                        </p>
                    </div>
                </div>
                <!-- Выравнивание последнего ряда -->
                <div v-for="n in 2" :key="`dummy-${n}`" class="hidden w-72 xl:block" />
            </div>

            <div class="mt-10 text-center">
                <NuxtLink
                    to="/portfolio"
                    class="inline-flex items-center gap-2 border border-brand text-brand hover:bg-brand hover:text-white font-semibold px-6 py-3 rounded-md transition-colors"
                >
                    Смотреть все работы
                </NuxtLink>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { inject } from "vue";

useHead({
    title: 'Каталог винтовых свай — Свай12',
    meta: [{ name: 'description', content: 'Каталог винтовых свай разных диаметров. Сваи 57, 76, 89, 108, 133 мм с ценами и характеристиками.' }],
})

const openOrderModal = inject<() => void>("openOrderModal");
const assetPath = usePublicAsset();
</script>

<template>
    <div class="mx-auto max-w-395 px-4 py-12 md:px-6 lg:px-8">
        <div class="mb-10 text-center">
            <h1 class="mb-4 text-3xl font-bold text-content-primary md:text-4xl">
                Каталог винтовых свай
            </h1>
            <p class="mx-auto max-w-160 text-base leading-relaxed text-content-secondary">
                Демонстрационная карточка каталога. Дальше на ее основе можно собрать полную сетку типоразмеров и цен.
            </p>
        </div>

        <div class="flex justify-center">
            <SvaiCard
                title="Сваи 57"
                badge="Акция"
                :image-src="assetPath('/images/catalog/svai-57.svg')"
                image-alt="Винтовая свая 57 мм"
                :lengths="[1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000]"
                base-price="от 1250 руб."
                install-price="от 2100 руб."
                @order="openOrderModal?.()"
            />
        </div>
    </div>
</template>

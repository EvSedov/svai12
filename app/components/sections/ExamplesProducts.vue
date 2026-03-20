<script lang="ts" setup>
import { ref, computed } from "vue";
import SvaiCard from "@/components/SvaiCard.vue";
import OgolovokCard from "@/components/OgolovokCard.vue";

const assetPath = usePublicAsset();

interface Props {
    activeFilters: string[];
}
const props = defineProps<Props>();

interface SvaiProduct {
    id: number;
    title: string;
    imageSrc: string;
    badge: string;
    lengths: number[];
    basePrice: string;
    installPrice: string;
    category: string[];
}

interface OgolovokProduct {
    id: number;
    title: string;
    imageSrc: string;
    badge: string;
    thickness: string;
    price: string;
    category: string[];
}

const allSvai = ref<SvaiProduct[]>([
    {
        id: 1,
        title: "Сваи 57",
        imageSrc: assetPath("/images/products/svai-57.png"),
        badge: "АКЦИЯ",
        lengths: [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        basePrice: "от 1250 руб.",
        installPrice: "от 2100 руб.",
        category: ["screw-piles"],
    },
    {
        id: 2,
        title: "Сваи 76",
        imageSrc: assetPath("/images/products/svai-76.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        basePrice: "от 1750 руб.",
        installPrice: "от 2850 руб.",
        category: ["screw-piles"],
    },
    {
        id: 3,
        title: "Сваи 89",
        imageSrc: assetPath("/images/products/svai-89.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
        basePrice: "от 2100 руб.",
        installPrice: "от 3225 руб.",
        category: ["screw-piles"],
    },
    {
        id: 4,
        title: "Сваи 108",
        imageSrc: assetPath("/images/products/svai-108.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
        basePrice: "от 2550 руб.",
        installPrice: "от 3775 руб.",
        category: ["screw-piles"],
    },
    {
        id: 5,
        title: "Сваи 133",
        imageSrc: assetPath("/images/products/svai-133.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
        basePrice: "от 3150 руб.",
        installPrice: "от 4450 руб.",
        category: ["screw-piles"],
    },
    {
        id: 6,
        title: "Сваи 159",
        imageSrc: assetPath("/images/products/svai-159.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
        basePrice: "по запросу",
        installPrice: "от 6475 руб.",
        category: ["screw-piles"],
    },
]);

const allOgolovki = ref<OgolovokProduct[]>([
    {
        id: 101,
        title: "Оголовок под сваю ф57 (100х100 \\ 150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-57.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 200 руб.",
        category: ["caps"],
    },
    {
        id: 102,
        title: "Оголовок под сваю ф76 (150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-76.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 250 руб.",
        category: ["caps"],
    },
    {
        id: 103,
        title: "Оголовок под сваю ф89 (150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-89.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 250 руб.",
        category: ["caps"],
    },
    {
        id: 104,
        title: "Оголовок под сваю ф108 (150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-108.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 325 руб.",
        category: ["caps"],
    },
    {
        id: 105,
        title: "Оголовок под сваю ф133 (200х200)",
        imageSrc: assetPath("/images/products/ogolovok-133.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 325 руб.",
        category: ["caps"],
    },
    {
        id: 106,
        title: "Оголовок под сваю ф159 (250х250)",
        imageSrc: assetPath("/images/products/ogolovok-159.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 625 руб.",
        category: ["caps"],
    },
]);

const showSvai = computed(() =>
    props.activeFilters.length === 0 || props.activeFilters.includes("screw-piles"),
);

const showCaps = computed(() =>
    props.activeFilters.length === 0 || props.activeFilters.includes("caps"),
);
</script>

<template>
    <div id="examples" class="w-full">
        <div class="mx-auto grid max-w-397.5 grid-cols-1 gap-5.5 px-2.5 pb-22.5 justify-items-center sm:justify-items-stretch sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <template v-if="showSvai">
                <SvaiCard
                    v-for="product in allSvai"
                    :key="product.id"
                    :title="product.title"
                    :image-src="product.imageSrc"
                    :badge="product.badge"
                    :lengths="product.lengths"
                    :base-price="product.basePrice"
                    :install-price="product.installPrice"
                />
            </template>
            <div v-if="showSvai && showCaps" class="col-span-full" />
            <template v-if="showCaps">
                <OgolovokCard
                    v-for="product in allOgolovki"
                    :key="product.id"
                    :title="product.title"
                    :image-src="product.imageSrc"
                    :badge="product.badge"
                    :thickness="product.thickness"
                    :price="product.price"
                />
            </template>
        </div>
    </div>
</template>

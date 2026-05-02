<script lang="ts" setup>
import { computed, inject } from "vue";
import SvaiCard from "@/components/SvaiCard.vue";
import OgolovokCard from "@/components/OgolovokCard.vue";
import { createOgolovokProducts, createSvaiProducts } from "@/data/products";

const assetPath = usePublicAsset();
const openOrderModal = inject<() => void>("openOrderModal");

interface Props {
    activeFilters: string[];
}
const props = defineProps<Props>();

const allSvai = computed(() => createSvaiProducts(assetPath));
const allOgolovki = computed(() => createOgolovokProducts(assetPath));

const showSvai = computed(() =>
    props.activeFilters.length === 0 || props.activeFilters.includes("screw-piles"),
);

const showCaps = computed(() =>
    props.activeFilters.length === 0 || props.activeFilters.includes("caps"),
);
</script>

<template>
    <div id="examples" class="w-full">
        <div class="mx-auto flex max-w-397.5 flex-wrap justify-center gap-5.5 px-2.5 pb-22.5">
            <template v-if="showSvai">
                <SvaiCard
                    v-for="product in allSvai"
                    :key="product.id"
                    :title="product.title"
                    :image-src="product.imageSrc"
                    :badge="product.badge"
                    :in-stock="product.inStock"
                    :stock-label="product.stockLabel"
                    :lengths="product.lengths"
                    :base-price="product.basePrice"
                    :install-price="product.installPrice"
                    :price-rows="product.priceRows"
                    :default-cap="product.defaultCap"
                    :cap-options="product.capOptions"
                    :cap-prices="product.capPrices"
                    :cap-selection-note="product.capSelectionNote"
                    :without-cap-discount="product.withoutCapDiscount"
                    @order="openOrderModal?.()"
                />
            </template>
            <div v-if="showSvai && showCaps" class="h-0 basis-full" />
            <template v-if="showCaps">
                <OgolovokCard
                    v-for="product in allOgolovki"
                    :key="product.id"
                    :title="product.title"
                    :image-src="product.imageSrc"
                    :badge="product.badge"
                    :thickness="product.thickness"
                    :price="product.price"
                    @order="openOrderModal?.()"
                />
            </template>
        </div>
    </div>
</template>

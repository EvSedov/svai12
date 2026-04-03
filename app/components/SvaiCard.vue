<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";

interface Props {
    title: string;
    imageSrc: string;
    imageAlt?: string;
    badge?: string;
    inStock?: boolean;
    stockLabel?: string;
    lengths: Array<number | string>;
    basePrice: string;
    installPrice: string;
    basePriceLabel?: string;
    installPriceLabel?: string;
    buttonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
    imageAlt: "",
    badge: "",
    inStock: true,
    stockLabel: "В наличии",
    basePriceLabel: "Без монтажа",
    installPriceLabel: "С монтажом",
    buttonLabel: "Заказать",
});

defineEmits<{
    order: [];
}>();
</script>

<template>
    <article
        class="flex w-full max-w-101 flex-col rounded-3xl bg-white p-6 shadow-[0_18px_48px_rgba(0,0,0,0.08)]"
    >
        <div class="mb-5 flex min-h-10 items-start justify-between">
            <div
                v-if="props.badge"
                class="inline-flex min-h-9 items-center rounded-md border border-brand px-4 text-4.5 leading-none font-medium tracking-[0.02em] text-brand uppercase"
            >
                {{ props.badge }}
            </div>
        </div>

        <div class="mb-6 flex h-60 items-center justify-center sm:h-64">
            <img
                :src="props.imageSrc"
                :alt="props.imageAlt || props.title"
                class="h-full w-full object-contain"
            />
        </div>

        <div class="mb-4 flex items-center gap-2">
            <span
                :class="props.inStock ? 'bg-success-bright' : 'bg-black/20'"
                class="h-2.5 w-2.5 shrink-0 rounded-full"
            />
            <span class="text-4.5 leading-none font-medium tracking-[0.02em] text-black/45">
                {{ props.stockLabel }}
            </span>
        </div>

        <h3 class="mb-6 font-montserrat text-8 leading-none font-semibold tracking-[0.02em] text-black/75">
            {{ props.title }}
        </h3>

        <div class="mb-3">
            <p class="mb-3 text-5.5 leading-none font-medium tracking-[0.02em] text-black/65">
                Длина (мм):
            </p>
            <div class="flex flex-wrap gap-2">
                <span
                    v-for="length in props.lengths"
                    :key="length"
                    class="inline-flex min-h-8 items-center rounded-md bg-brand-light px-2.5 text-4.5 leading-none font-medium tracking-[0.02em] text-brand"
                >
                    {{ length }}
                </span>
            </div>
        </div>

        <div class="mb-5 flex flex-col gap-4">
            <div class="flex items-end justify-between gap-4">
                <span class="text-8 leading-none font-medium tracking-[0.02em] text-black/75">
                    {{ props.basePriceLabel }}
                </span>
                <span class="text-right text-8 leading-none font-semibold tracking-[0.02em] text-black/75">
                    {{ props.basePrice }}
                </span>
            </div>

            <div class="flex items-end justify-between gap-4">
                <span class="text-8 leading-none font-medium tracking-[0.02em] text-brand">
                    {{ props.installPriceLabel }}
                </span>
                <span class="text-right text-8 leading-none font-semibold tracking-[0.02em] text-brand">
                    {{ props.installPrice }}
                </span>
            </div>
        </div>

        <Button
            class="mt-auto h-14 w-full rounded-2xl border-2 border-brand-border bg-brand text-8 leading-none font-semibold tracking-[0.02em] text-white hover:bg-brand-border"
            @click="$emit('order')"
        >
            {{ props.buttonLabel }}
        </Button>
    </article>
</template>

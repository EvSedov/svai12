<script lang="ts" setup>
import { Button } from "@/Components/atoms/ui/button";
import ArrowRight from "@/Components/atoms/icons/ArrowRight.vue";

interface Product {
    id: number;
    title: string;
    image: string;
    link: string;
    bgColor: string;
    titleColor: string;
}

const props = defineProps<{
    product: Product;
    index: number;
    getProductCardImgClasses: (index: number) => string;
}>();
</script>

<template>
    <div
        :style="{ backgroundColor: props.product.bgColor }"
        class="relative flex h-[515px] w-[227px] flex-col rounded-xl pt-2 pb-16.5 hover:z-10 hover:scale-118"
    >
        <!-- Вертикальный заголовок категории -->
        <h3
            class="self-start text-[55px]/[60px] font-semibold tracking-wider whitespace-nowrap"
            :style="{
                color: props.product.titleColor,
            }"
        >
            {{ props.product.title }}
        </h3>

        <Button
            class="mx-auto mt-auto mr-5 ml-5 flex h-[45px] w-[192px] border-dashed border-[#0034B0] bg-transparent p-6 text-[12px] font-semibold text-black"
            variant="outline"
        >
            Узнать подробнее
            <ArrowRight class="ml-2 h-4 w-4 invert" />
        </Button>
        <img
            :src="props.product.image"
            :alt="props.product.title"
            class="absolute z-5"
            :style="props.getProductCardImgClasses(props.index)"
            @error="
                console.error(
                    'Ошибка загрузки изображения:',
                    props.product.image,
                )
            "
        />
    </div>
</template>

<style scoped>
h3 {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
}
</style>

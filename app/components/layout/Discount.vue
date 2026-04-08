<script setup lang="ts">
import { inject } from "vue";
import { Button } from "@/components/ui/button";
const openOrderModal = inject("openOrderModal") as () => void;
</script>

<template>
    <div class="bg-brand py-2.75">
        <div class="discount mx-auto flex-col xl:flex-row">
            <p
                class="mb-2 text-center font-[Commissioner] text-xl/5.5 font-bold tracking-normal text-white uppercase xl:mb-0">
                Скидка 5% через онлайн заявку при заказе от 200 000 ₽! 
            </p>
            <Button
                class="m-0 ml-[11.6px] h-6.25 bg-white px-2.5 py-0 text-[10px] text-content-primary hover:bg-gray-300"
                @click="openOrderModal">Подробнее</Button>
        </div>
    </div>
</template>

<style lang="css" scoped>
.discount {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 0px 30px;
    gap: 11.6px;
}
</style>

<script setup lang="ts">
// Массивы с данными для секций
const cards = [
    {
        name: "VISA",
        icon: "/icons/visa.svg",
        className: "w-13 h-7.5",
    },
    {
        name: "mastercard",
        icon: "/icons/mastercard.svg",
        className: "w-9.5 h-7.5",
    },
    {
        name: "maestro",
        icon: "/icons/maestro.svg",
        className: "w-9.5 h-7.5",
    },
    {
        name: "МИР",
        icon: "/icons/mir.svg",
        className: "w-16 h-5",
    },
    {
        name: "Apple Pay",
        icon: "/icons/applepay.svg",
        className: "w-15.5 h-10.5",
    },
];

const bank = [
    {
        name: "Банковский расчет",
        icon: "/icons/bank.svg",
    },
];
</script>

<template>
    <section class="mx-auto my-0 flex w-full bg-[#f7f7f7] pt-18 pb-20">
        <div class="mx-auto my-0 px-4 md:px-6 lg:px-8">
            <h2
                class="mb-7 text-center text-3xl font-bold sm:text-4xl md:text-[42px]"
            >
                Способы оплаты в Типографии
            </h2>
            <div
                class="grid grid-cols-1 overflow-hidden rounded-2xl bg-white text-sm xl:grid-cols-2"
            >
                <!-- 1 -->
                <div
                    class="flex flex-col items-center justify-center border-b border-[#ececec] px-4 pb-13 xl:border-r xl:border-b-0 xl:px-19"
                >
                    <div class="mt-6.5 mb-6 text-center font-medium">
                        Любые банковские карты
                    </div>
                    <div
                        class="flex flex-wrap items-center justify-center gap-10"
                    >
                        <img
                            v-for="item in cards"
                            :key="item.name"
                            :src="item.icon"
                            :alt="item.name"
                            :class="item.className"
                        />
                    </div>
                </div>
                <!-- 2 -->
                <div
                    class="flex flex-col items-center justify-center px-4 pb-13 xl:border-r xl:border-[#ececec] xl:px-19"
                >
                    <div class="mt-6.5 mb-6 text-center font-medium">
                        Оплата наличными и банковский перевод
                    </div>
                    <div class="flex items-center gap-8">
                        <img
                            v-for="item in bank"
                            :key="item.name"
                            :src="item.icon"
                            :alt="item.name"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
* {
    font-family: "Commissioner";
}
</style>

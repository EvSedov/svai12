<script setup lang="ts">
import { inject } from "vue";
import Logo from "@/components/Logo.vue";
import Menu from "@/components/layout/Menu.vue";
import MobileMenuToggle from "@/components/layout/MobileMenuToggle.vue";
import { Button } from "@/components/ui/button";
import BasketShopping from "@/components/icons/BasketShopping.vue";

const openOrderModal = inject("openOrderModal") as () => void;
</script>

<template>
    <div class="header">
        <div class="container flex items-center xl:justify-between">
            <Logo class="mr-10" />
            <Menu class="mr-auto hidden xl:flex" />

            <div
                class="mr-8 hidden items-center space-x-4 text-sm md:ml-auto! md:flex"
            >
                <div class="flex flex-col items-end">
                    <div class="flex items-center justify-end gap-1">
                        <span class="flex">
                            <img
                                src="/icons/i-social-whatsapp.png"
                                alt="Иконка социальной сети WhatsApp"
                                class="mr-1 h-4 w-4"
                            />
                            <img
                                src="/icons/i-social-tg.png"
                                alt="Иконка социальной сети телеграмм"
                                class="mr-1 h-4 w-4"
                            />
                        </span>
                        <a
                            href="tel:+79254709400"
                            class="rounded-md px-1 py-0.5 font-semibold whitespace-nowrap text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]"
                            >+7 (925) 470-94-00</a
                        >
                    </div>

                    <a
                        href="mailto:POPECHATI@GMAIL.COM"
                        class="rounded-md px-1 py-0.5 text-xs whitespace-nowrap text-gray-600 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]"
                        >popechati@gmail.com</a
                    >
                </div>
            </div>

            <div class="ml-auto md:ml-0 xl:hidden">
                <MobileMenuToggle />
            </div>

            <Button
                class="hidden rounded-md border-2 border-[#B16303] bg-[#FF8D00] px-6 py-3 text-base font-semibold tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-[#B16303] xl:flex"
                @click="openOrderModal"
            >
                <BasketShopping class="mr-2 h-4 w-4" />
                Создать заказ
            </Button>
        </div>
    </div>
</template>

<style lang="css" scoped>
.header {
    width: 100%;
}
.container {
    max-width: 1590px;
    margin: 0 auto;
    padding: 12px 10px 0;
}
</style>

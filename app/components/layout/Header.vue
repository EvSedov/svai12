<script setup lang="ts">
import { inject } from "vue";
import Logo from "@/components/Logo.vue";
import Menu from "@/components/layout/Menu.vue";
import MobileMenuToggle from "@/components/layout/MobileMenuToggle.vue";
import { Button } from "@/components/ui/button";
import PhoneArrowDownLeft from "@/components/icons/PhoneArrowDownLeft.vue";

const openOrderModal = inject("openOrderModal") as () => void;
</script>

<template>
    <div class="header">
        <div class="container flex items-center xl:justify-between">
            <Logo class="mr-10" />
            <Menu class="mr-auto hidden xl:flex" />

            <div class="mr-8 hidden items-center space-x-4 text-sm md:ml-auto! md:flex">
                <div class="flex flex-col items-end">
                    <div class="flex items-center justify-end gap-1">
                        <span class="flex">
                            <img src="/icons/i-social-whatsapp.png" alt="Иконка социальной сети WhatsApp"
                                class="mr-1 h-4 w-4" />
                            <img src="/icons/i-social-tg.png" alt="Иконка социальной сети телеграмм"
                                class="mr-1 h-4 w-4" />
                        </span>
                        <a href="tel:+79021091101"
                            class="rounded-md px-1 py-0.5 font-tt-norms text-base font-medium leading-none tracking-[0.02em] uppercase text-center align-middle whitespace-nowrap text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-light">+7
                            (902) 109-11-01</a>
                    </div>

                    <a href="mailto:svai12@mail.ru"
                        class="rounded-md px-1 py-0.5 text-xs whitespace-nowrap text-gray-600 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-light">svai12@mail.ru</a>
                </div>
            </div>

            <div class="ml-auto md:ml-0 xl:hidden">
                <MobileMenuToggle />
            </div>

            <Button
                class="hidden rounded-md border-2 border-brand-border bg-brand px-6 py-3 text-base font-semibold tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-brand-border xl:flex"
                @click="openOrderModal">
                Обратный звонок
                <PhoneArrowDownLeft class="mr-2 h-4 w-4" />
            </Button>
        </div>
    </div>
</template>

<style lang="css" scoped>
.header {
    width: 100%;
}

.container {
    max-width: 1580px;
    margin: 0 auto;
    padding: 12px 10px 0;
}
</style>

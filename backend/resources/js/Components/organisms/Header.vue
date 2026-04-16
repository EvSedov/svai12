<script setup lang="ts">
import { inject } from "vue";
import Logo from "@/Components/atoms/Logo.vue";
import Menu from "@/Components/molecules/Menu.vue";
import MobileMenuToggle from "@/Components/molecules/MobileMenuToggle.vue";
import { Button } from "@/Components/atoms/ui/button";
import BasketShopping from "@/Components/atoms/icons/BasketShopping.vue";

// TODO: Импортировать или создать компоненты для иконок Telegram, WhatsApp, Phone, если они еще не существуют
// import TelegramIcon from "@/Components/atoms/icons/Telegram.vue";
// import WhatsAppIcon from "@/Components/atoms/icons/WhatsApp.vue";
// import PhoneIcon from "@/Components/atoms/icons/Phone.vue";

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
                        <!-- TODO: добавить иконку телефона -->
                        <!-- <PhoneIcon class="mr-1 h-4 w-4 text-gray-700" /> -->
                        <span class="flex">
                            <img
                                src="/public/icons/i-social-whatsapp.png"
                                alt="Иконка социальной сети WhatsApp"
                                class="mr-1 h-4 w-4"
                            />
                            <img
                                src="/public/icons/i-social-tg.png"
                                alt="Иконка социальной сети телеграмм"
                                class="mr-1 h-4 w-4"
                            />
                        </span>
                        <a
                            href="tel:+79254709400"
                            class="rounded-md px-1 py-0.5 font-semibold whitespace-nowrap text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-pink-100"
                            >+7 (925) 470-94-00</a
                        >
                    </div>

                    <a
                        href="mailto:POPECHATI@GMAIL.COM"
                        class="rounded-md px-1 py-0.5 text-xs whitespace-nowrap text-gray-600 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-100"
                        >popechati@gmail.com</a
                    >
                </div>
                <!-- Иконки соцсетей -->
                <!-- TODO: Добавить иконки Telegram и WhatsApp -->
                <!-- <div class="flex items-center space-x-2">
                    <a href="#"><TelegramIcon class="h-5 w-5 text-gray-700" /></a>
                    <a href="#"><WhatsAppIcon class="h-5 w-5 text-gray-700" /></a>
                </div> -->
            </div>

            <div class="ml-auto md:ml-0 xl:hidden">
                <MobileMenuToggle />
            </div>

            <Button
                class="hidden rounded-md border-2 border-[#BA2150] bg-gradient-to-r from-[#F10488] to-[#FF0224] px-6 py-3 text-base font-semibold tracking-wider text-white shadow-lg transition-all duration-300 hover:from-[#E2047A] hover:to-[#E0021F] xl:flex"
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

/* Пример градиентного фона для кнопки */
/* Tailwind CSS уже предоставляет утилиты для градиентов, но если нужны кастомные, можно добавить здесь */
/* .bg-linear-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
} */
</style>

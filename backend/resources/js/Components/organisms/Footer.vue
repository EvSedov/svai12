<script setup lang="ts">
import Logo from "@/Components/atoms/Logo.vue";
</script>

<template>
    <div class="footer border-t border-[#F3F3F3] py-8">
        <div
            class="mx-auto grid w-fit max-w-[1220px] grid-cols-1 gap-y-8 px-4 md:grid-cols-2 md:px-6 lg:gap-x-12 lg:px-8 xl:grid-cols-4 xl:gap-x-[88px]"
        >
            <div class="flex flex-col">
                <ul class="m-0 flex flex-col p-0">
                    <li>
                        <Logo />
                    </li>
                    <li class="my-6 w-33.5">
                        <div class="grid grid-cols-2 grid-rows-2 gap-1.5">
                            <div
                                class="flex h-8 w-16 items-center justify-center rounded-sm border-1 border-[#EAEAEA]"
                            >
                                <img
                                    src="/public/icons/cards-visa.png"
                                    alt="Оплата картой visa"
                                />
                            </div>
                            <div
                                class="flex h-8 w-16 items-center justify-center rounded-sm border-1 border-[#EAEAEA]"
                            >
                                <img
                                    src="/public/icons/cards-master.png"
                                    alt="Оплата master card"
                                />
                            </div>
                            <div
                                class="flex h-8 w-16 items-center justify-center rounded-sm border-1 border-[#EAEAEA]"
                            >
                                <img
                                    src="/public/icons/cards-webmoney.png"
                                    alt="Оплата через WebMoney"
                                />
                            </div>
                            <div
                                class="flex h-8 w-16 items-center justify-center rounded-sm border-1 border-[#EAEAEA]"
                            >
                                <img
                                    src="/public/icons/cards-mir.png"
                                    alt="Оплата картой Мир"
                                />
                            </div>
                        </div>
                    </li>
                    <li class="mb-5">
                        <div class="icons-social flex gap-[5px]">
                            <img
                                src="/public/icons/i-social-vk.png"
                                alt="Иконка социальной сети вконтакте"
                            />
                            <img
                                src="/public/icons/i-social-tg.png"
                                alt="Иконка социальной сети телеграмм"
                            />
                            <img
                                src="/public/icons/i-social-whatsapp.png"
                                alt="Иконка социальной сети WhatsApp"
                            />
                        </div>
                    </li>
                    <li class="mt-4">
                        <span class="text-xs leading-relaxed text-[#2C2C2C]">
                            Copyright © 2014 – 2025 Popechati.com
                        </span>
                    </li>
                </ul>
            </div>
            <div class="flex min-w-66.5 flex-col">
                <ul class="m-0 flex flex-col p-0">
                    <li class="mb-4.5">
                        <p class="text-lg/5.5 font-medium text-[#2C2C2C]">
                            Контакты
                        </p>
                    </li>
                    <li class="mb-[13px]">
                        <div class="flex items-center gap-2">
                            <a href="tel:+79254709400" class="flex">
                                <p
                                    class="w-fit rounded-md px-1 py-0.5 text-base/6.5 font-semibold text-[#2c2c2c] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-pink-100"
                                >
                                    +7 (925) 470-94-00
                                </p>
                            </a>
                            <span class="flex gap-1.5">
                                <img
                                    src="/public/icons/i-social-whatsapp.png"
                                    alt="Иконка социальной сети WhatsApp"
                                    class="h-4 w-4"
                                />
                                <img
                                    src="/public/icons/i-social-tg.png"
                                    alt="Иконка социальной сети телеграмм"
                                    class="h-4 w-4"
                                />
                            </span>
                        </div>
                    </li>
                    <li class="mb-4">
                        <a
                            class="rounded-md px-1 py-0.5 text-base/6.5 font-semibold text-[#1882F0] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-100"
                            href="mailto:popechati@gmail.com"
                        >
                            popechati@gmail.com
                        </a>
                    </li>
                    <li
                        class="text-sm leading-relaxed font-normal text-[#2C2C2C]"
                    >
                        <span class="block max-w-73 leading-relaxed">
                            г. Москва, Батайский проезд 59, вход с противоположной стороны от
                            подъездов, под вывеской «КОПИ ЦЕНТ», 7 минут пешком от метро
                            Марьино
                        </span>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col">
                <ul class="m-0 flex flex-col p-0">
                    <li class="mb-4.5">
                        <p class="text-lg/5.5 font-medium text-[#2C2C2C]">
                            Информация
                        </p>
                    </li>
                    <li class="">
                        <ul
                            class="text-sm leading-[25px] font-normal text-[#2C2C2C] underline"
                        >
                            <li><span>Контакты</span></li>
                            <li><span>Требования к макетам</span></li>
                            <li class="flex flex-wrap">
                                <span>Оплата</span>,
                                <span class="ml-1">доставка</span>,
                                <span class="ml-1">возврат</span>
                            </li>
                            <li><span>Реальные отзывы</span></li>
                            <li><span>Пользовательское соглашение</span></li>
                            <li><span>Публичная оферта</span></li>
                            <li><span>Каталог материалов</span></li>
                            <li><span>Переделка и возврат</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col">
                <ul class="m-0 flex flex-col p-0">
                    <li class="mb-4.5">
                        <p class="text-lg/5.5 font-medium text-[#2C2C2C]">
                            Популярные услуги
                        </p>
                    </li>
                    <li class="">
                        <ul
                            class="text-sm leading-[25px] font-normal text-[#2C2C2C] underline"
                        >
                            <li class="flex flex-wrap">
                                <span>Печать визиток</span>,
                                <span class="ml-1">листовок</span>
                            </li>
                            <li><span>Печать на баннере</span></li>
                            <li><span>Календари</span></li>
                            <li class="flex flex-wrap">
                                <span>Печать плакатов</span>,
                                <span class="ml-1">наклеек</span>
                            </li>
                            <li class="flex flex-wrap">
                                <span>Roll Up</span>,
                                <span class="ml-1">Press Wall</span>
                            </li>
                            <li class="flex flex-wrap">
                                <span>Печать на кружках</span>,
                                <span class="ml-1">ручках</span>
                            </li>
                            <li class="flex flex-wrap">
                                <span>Холсты</span>,
                                <span class="ml-1">фотоколлажи</span>,
                                <span class="ml-1">пазлы</span>
                            </li>
                            <li><span>Все услуги</span></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.footer {
    width: 100%;
}
</style>

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
const assetPath = usePublicAsset();
</script>

<template>
    <div class="footer border-t border-[#F3F3F3] py-8">
        <div
            class="mx-auto flex w-fit max-w-305 flex-col-reverse gap-y-8 px-4 md:grid md:grid-cols-2 md:px-6 lg:gap-x-12 lg:px-8 xl:grid-cols-3 xl:gap-x-22">
            <div class="flex flex-col">
                <ul class="m-0 flex flex-col p-0">
                    <li>
                        <Logo />
                    </li>
                    <li class="my-6">
                        <div class="icons-social flex gap-1.25">
                            <img :src="assetPath('/icons/i-social-vk.png')" alt="Иконка социальной сети вконтакте" />
                            <img :src="assetPath('/icons/i-social-tg.png')" alt="Иконка социальной сети телеграмм" />
                            <img :src="assetPath('/icons/i-social-whatsapp.png')" alt="Иконка социальной сети WhatsApp" />
                        </div>
                    </li>
                    <li class="mt-4">
                        <span class="text-xs leading-relaxed text-[#2C2C2C]">
                            Copyright © 2026 svai12.ru
                        </span>
                    </li>
                </ul>
            </div>
            <div class="flex min-w-66.5 flex-col">
                <ul class="m-0 flex flex-col gap-3 p-0">
                    <li>
                        <p class="text-lg/5.5 font-medium text-[#2C2C2C]">
                            Контакты
                        </p>
                    </li>
                    <li>
                        <a href="tel:+79877330011" class="flex w-fit">
                            <p
                                class="w-fit rounded-md px-1 py-0.5 text-base/6.5 font-semibold text-content-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]">
                                +7 (987) 733-00-11
                            </p>
                        </a>
                    </li>
                    <li>
                        <a class="rounded-md px-1 py-0.5 text-base/6.5 font-semibold text-[#FF8D00] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]"
                            href="mailto:svai12@mail.ru">
                            svai12@mail.ru
                        </a>
                    </li>
                    <li class="text-sm leading-relaxed font-normal text-[#2C2C2C]">
                        <span class="block max-w-73 leading-relaxed">
                            Республика Марий Эл, Оршанский район, д.Лужбеляк, ул.Центральная,25
                        </span>
                    </li>
                    <li class="pt-3">
                        <p class="text-lg/5.5 font-medium text-[#2C2C2C]">
                            Реквизиты
                        </p>
                    </li>
                    <li class="space-y-1 text-sm leading-relaxed font-normal text-[#2C2C2C]">
                        <span class="block">ИП Красноперов Дмитрий Николаевич</span>
                        <span class="block">ОГРНИП: 3251200000031256</span>
                        <span class="block">ИНН: 121001898401</span>
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
                        <ul class="text-sm leading-6.25 font-normal text-[#2C2C2C] underline">
                            <li><span>Контакты</span></li>
                            <li><span>Реальные отзывы</span></li>
                            <li><span>Пользовательское соглашение</span></li>
                            <li><span>Публичная оферта</span></li>
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

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import { scrollToSection } from "@/lib/utils";

const assetPath = usePublicAsset();
const route = useRoute();

const infoLinks = [
    { label: "Главная", href: "#hero" },
    { label: "О нас", href: "#how-we-work" },
    { label: "Каталог винтовых свай", href: "#examples" },
    { label: "Примеры работ", href: "#portfolio" },
    { label: "Контакты", href: "#contacts" },
    { label: "Реальные отзывы", href: "#reviews" },
    { label: "Вопросы/Ответы", href: "#faqs" },
    { label: "Пользовательское соглашение" },
    { label: "Публичная оферта" },
];

const handleInfoClick = async (event: Event) => {
    const targetElement = event.currentTarget as HTMLAnchorElement;
    const href = targetElement.getAttribute("href");

    if (!href || !href.startsWith("#")) {
        return;
    }

    event.preventDefault();

    if (route.path === "/") {
        scrollToSection(href);
        return;
    }

    await navigateTo(`/${href}`);
};
</script>

<template>
    <div class="footer border-t border-border-section py-8">
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
                        <span class="text-xs leading-relaxed text-content-primary">
                            Copyright © 2026 svai12.ru
                        </span>
                    </li>
                </ul>
            </div>
            <div class="flex min-w-66.5 flex-col">
                <ul class="m-0 flex flex-col gap-3 p-0">
                    <li>
                        <p class="text-lg/5.5 font-medium text-content-primary">
                            Контакты
                        </p>
                    </li>
                    <li>
                        <a href="tel:+79933881308" class="flex w-fit">
                            <p
                                class="w-fit rounded-md px-1 py-0.5 text-base/6.5 font-semibold text-content-primary transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-light">
                                +7 (993) 388-13-08
                            </p>
                        </a>
                    </li>
                    <li>
                        <a class="rounded-md px-1 py-0.5 text-base/6.5 font-semibold text-brand transition-all duration-300 ease-in-out hover:scale-105 hover:bg-brand-light"
                            href="mailto:svai12@inbox.ru">
                            svai12@inbox.ru
                        </a>
                    </li>
                    <li class="text-sm leading-relaxed font-normal text-content-primary">
                        <span class="block max-w-73 leading-relaxed">
                            Респ. Марий Эл, г.&nbsp;Йошкар-Ола, ул.&nbsp;Красноармейская слобода, дом&nbsp;44, офис&nbsp;2
                        </span>
                    </li>
                    <li class="pt-3">
                        <p class="text-lg/5.5 font-medium text-content-primary">
                            Реквизиты
                        </p>
                    </li>
                    <li class="space-y-1 text-sm leading-relaxed font-normal text-content-primary">
                        <span class="block">ИП Красноперов Дмитрий Николаевич</span>
                        <span class="block">ОГРНИП: 3251200000031256</span>
                        <span class="block">ИНН: 121001898401</span>
                    </li>
                </ul>
            </div>
            <div class="flex flex-col">
                <ul class="m-0 flex flex-col p-0">
                    <li class="mb-4.5">
                        <p class="text-lg/5.5 font-medium text-content-primary">
                            Информация
                        </p>
                    </li>
                    <li class="">
                        <ul class="text-sm leading-6.25 font-normal text-content-primary underline">
                            <li v-for="item in infoLinks" :key="item.label">
                                <a
                                    v-if="item.href"
                                    :href="item.href"
                                    class="transition-colors hover:text-brand"
                                    @click="handleInfoClick"
                                >
                                    {{ item.label }}
                                </a>
                                <span v-else>
                                    {{ item.label }}
                                </span>
                            </li>
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

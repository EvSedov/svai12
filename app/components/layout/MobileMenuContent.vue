<script setup lang="ts">
import { inject } from "vue";
import { Button } from "@/components/ui/button";
import PhoneArrowDownLeft from "@/components/icons/PhoneArrowDownLeft.vue";
import { scrollToSection } from "@/lib/utils";
const openOrderModal = inject("openOrderModal") as () => void;
const closeSheet = inject("closeSheet") as () => void;
const assetPath = usePublicAsset();

const handleLinkClick = () => {
    if (closeSheet) {
        closeSheet();
    }
};

const delayedScrollToSection = (targetId: string) => {
    // {{ edit_1 }} Возвращаем setTimeout
    window.setTimeout(() => {
        scrollToSection(targetId);
    }, 500); // Задержка в 500 мс
};
</script>

<template>
    <nav class="flex flex-col gap-2 p-4">
        <a href="#hero" class="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            @click.prevent="
                (event: Event) => {
                    handleLinkClick();
                    const targetId = (
                        event.currentTarget as HTMLAnchorElement
                    ).getAttribute('href'); // {{ edit_3 }} Получаем targetId здесь
                    if (targetId) {
                        // {{ edit_4 }} Добавляем проверку на targetId
                        delayedScrollToSection(targetId); // {{ edit_5 }} Передаем targetId
                    }
                }
            ">
            Главная
        </a>
        <a href="#how-we-work" class="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            @click.prevent="
                (event: Event) => {
                    handleLinkClick();
                    const targetId = (
                        event.currentTarget as HTMLAnchorElement
                    ).getAttribute('href');
                    if (targetId) {
                        delayedScrollToSection(targetId);
                    }
                }
            ">
            О нас
        </a>
        <a href="#examples" class="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            @click.prevent="
                (event: Event) => {
                    handleLinkClick();
                    const targetId = (
                        event.currentTarget as HTMLAnchorElement
                    ).getAttribute('href');
                    if (targetId) {
                        delayedScrollToSection(targetId);
                    }
                }
            ">
            Каталог винтовых свай
        </a>
        <a href="#portfolio" class="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            @click.prevent="
                (event: Event) => {
                    handleLinkClick();
                    const targetId = (
                        event.currentTarget as HTMLAnchorElement
                    ).getAttribute('href');
                    if (targetId) {
                        delayedScrollToSection(targetId);
                    }
                }
            ">
            Примеры работ
        </a>
        <a href="#reviews" class="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            @click.prevent="
                (event: Event) => {
                    handleLinkClick();
                    const targetId = (
                        event.currentTarget as HTMLAnchorElement
                    ).getAttribute('href');
                    if (targetId) {
                        delayedScrollToSection(targetId);
                    }
                }
            ">
            Отзывы
        </a>
        <a href="#contacts" class="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            @click.prevent="
                (event: Event) => {
                    handleLinkClick();
                    const targetId = (
                        event.currentTarget as HTMLAnchorElement
                    ).getAttribute('href');
                    if (targetId) {
                        delayedScrollToSection(targetId);
                    }
                }
            ">
            Контакты
        </a>
        <a href="#faqs" class="block rounded-md px-4 py-2 text-lg font-medium text-gray-700 hover:bg-gray-100"
            @click.prevent="
                (event: Event) => {
                    handleLinkClick();
                    const targetId = (
                        event.currentTarget as HTMLAnchorElement
                    ).getAttribute('href');
                    if (targetId) {
                        delayedScrollToSection(targetId);
                    }
                }
            ">
            Вопросы/Ответы
        </a>
    </nav>

    <div class="mt-4 flex flex-col items-center border-t border-gray-200 p-4 md:items-start">
        <div class="flex flex-col items-center space-y-2 px-4 text-sm md:items-start">
            <div class="flex items-center gap-1">
                <a href="tel:+79933881308"
                    class="rounded-md px-1 py-0.5 font-(family-name:--font-tt-norms) text-base font-medium leading-none tracking-[0.02em] uppercase text-center align-middle whitespace-nowrap text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:text-brand"
                    @click="handleLinkClick">+7 (993) 388-13-08</a>
                <img :src="assetPath('/icons/i-social-whatsapp.png')" alt="Иконка социальной сети WhatsApp" class="ml-1 h-4 w-4" />
                <img :src="assetPath('/icons/i-social-tg.png')" alt="Иконка социальной сети телеграмм" class="ml-1 h-4 w-4" />
            </div>

            <a href="mailto:svai12@inbox.ru"
                class="mt-2 rounded-md px-1 py-0.5 text-xs text-gray-600 transition-all duration-300 ease-in-out hover:scale-105 hover:text-brand"
                @click="handleLinkClick">svai12@inbox.ru</a>
        </div>

        <Button
            class="mt-4 box-border w-fit rounded-md border-2 border-brand-border bg-brand px-6 py-3 text-base font-semibold tracking-wider text-white shadow-lg transition-all duration-300 hover:bg-brand-border md:ml-4"
            @click="
                () => {
                    handleLinkClick();
                    openOrderModal();
                }
            ">
            <PhoneArrowDownLeft class="mr-2 h-4 w-4" />
            Обратный звонок
        </Button>
    </div>
</template>

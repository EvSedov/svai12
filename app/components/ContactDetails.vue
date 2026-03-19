<script setup lang="ts">
// Компонент с контактной информацией
const assetPath = usePublicAsset();
</script>

<template>
    <div class="contact-details max-w-[335px]">
        <!-- Адреса -->
        <div class="mb-4 flex gap-3">
            <h2 class="font-medium tracking-wide text-neutral-900">Адреса</h2>
            <a href="#"
                class="block h-[34px] rounded-lg border border-dashed border-brand px-5 py-1.5 text-center text-[13px] leading-[22px] font-medium whitespace-nowrap text-brand">
                Центральный офис
            </a>
        </div>

        <!-- Контакты и номера телефонов -->
        <div class="mb-2">
            <h3 class="font-medium text-neutral-900">
                Контакты и номера телефонов:
            </h3>
            <div>
                <div>
                    <a href="tel:+79021091101"
                        class="rounded-md px-1 py-0.5 text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]">
                        +7 (902) 109-11-01
                    </a>
                    <span class="text-neutral-400">(Генеральный директор)</span>
                </div>
                <div>
                    <a href="tel:+74993985601"
                        class="rounded-md px-1 py-0.5 text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]">
                        +7 (499) 398-56-01
                    </a>
                    <span class="text-neutral-400">(Городской номер)</span>
                </div>
                <div>
                    <a href="tel:+79778133227"
                        class="rounded-md px-1 py-0.5 text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]">
                        +7 (977) 813-32-27
                    </a>
                    <span class="text-neutral-400">(Прием заказов, консультация, сопровождение клиентов)</span>
                </div>
                <div>
                    <a href="mailto:svai12@mail.ru"
                        class="rounded-md px-1 py-0.5 text-[#FF8D00] transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#FFF3E4]">svai12@mail.ru</a>
                </div>
            </div>
        </div>

        <!-- Дополнительная информация -->
        <div class="mb-4">
            <h3 class="mb-2 font-medium text-neutral-900">Дополнительно:</h3>
            <p class="text-neutral-700">
                В нашем офисе есть образцы свай и оголовков для рассчёта стоимости
            </p>
        </div>

        <!-- Время работы -->
        <div class="mb-4">
            <h3 class="mb-2 font-medium text-neutral-900">Время работы:</h3>
            <p class="text-neutral-700">Пн - Пт: 11:00 - 22:00.</p>
            <p class="text-neutral-700">Сб, Вс: По договоренности!</p>
        </div>

        <!-- Адрес -->
        <div class="mb-6">
            <h3 class="mb-2 font-medium text-neutral-900">Адрес:</h3>
            <p class="text-neutral-700">
                г.&nbsp;Чебоксары, улица 10-ой Пятилетки&nbsp;2, кор.&nbsp;5, строение&nbsp;1
            </p>
        </div>

        <!-- Проложить маршрут -->
        <div>
            <h3 class="mb-2 font-medium text-neutral-900">
                Проложить маршрут:
            </h3>
            <div class="flex space-x-4">
                <a href="#" class="h-6 w-6 text-yellow-500">
                    <span class="sr-only">Яндекс</span>
                    <img :src="assetPath('/icons/icon-nav-yandex.svg')" alt="Яндекс карты" />
                </a>
                <a href="#" class="h-6 w-6 text-red-500">
                    <span class="sr-only">Google</span>
                    <img :src="assetPath('/icons/icons-nav-google.svg')" alt="Google map" />
                </a>
                <a href="#" class="h-6 text-blue-500">
                    <span class="sr-only">2GIS</span>
                    <img :src="assetPath('/icons/icon-nav-2gis.svg')" alt="Навигатор 2Gis" width="76" height="24" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
p,
span,
a {
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0.5px;
}

h2 {
    font-size: 20px;
}

h3 {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
}
</style>

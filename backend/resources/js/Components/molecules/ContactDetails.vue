<script setup lang="ts">
// Компонент с контактной информацией
</script>

<template>
    <div class="contact-details max-w-[335px]">
        <!-- Адреса -->
        <div class="mb-4 flex gap-3">
            <h2 class="font-medium tracking-wide text-neutral-900">Адреса</h2>
            <a href="#"
                class="block h-[34px] rounded-lg border border-dashed border-[#1882F0] px-5 py-1.5 text-center text-[13px] leading-[22px] font-medium whitespace-nowrap text-[#1882F0]">
                Центральный офис
            </a>
        </div>

        <!-- Контакты и номера телефонов -->
        <div class="mb-2">
            <h3 class="font-medium text-neutral-900">
                Контакты и номера телефонов:
            </h3>
            <div>
                <div class="flex items-center gap-2">
                    <a href="tel:+79254709400"
                        class="rounded-md px-1 py-0.5 text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-pink-100">
                        +7 (925) 470-94-00
                    </a>
                    &nbsp;
                    <span class="flex gap-1.5">
                        <img src="/public/icons/i-social-whatsapp.png" alt="Иконка социальной сети WhatsApp"
                            class="h-4 w-4" />
                        <img src="/public/icons/i-social-tg.png" alt="Иконка социальной сети телеграмм"
                            class="h-4 w-4" />
                    </span>
                </div>
                <div>
                    <a href="mailto:popechati@gmail.com"
                        class="rounded-md px-1 py-0.5 text-gray-900 transition-all duration-300 ease-in-out hover:scale-105 hover:bg-blue-100">popechati@gmail.com</a>
                </div>
            </div>
        </div>

        <!-- Дополнительная информация -->
        <div class="mb-4">
            <h3 class="mb-2 font-medium text-neutral-900">Дополнительно:</h3>
            <p class="text-neutral-700">
                В офисе есть каталог материалов и образцы продукции.
            </p>
        </div>

        <!-- Время работы -->
        <div class="mb-4">
            <h3 class="mb-2 font-medium text-neutral-900">Время работы:</h3>
            <p class="text-neutral-700">Пн-сб: 11:00 – 19:00</p>
            <p class="text-neutral-700">Вс: по договоренности</p>
        </div>

        <!-- Адрес -->
        <div class="mb-6">
            <h3 class="mb-2 font-medium text-neutral-900">Адрес:</h3>
            <p class="text-neutral-700">
                г. Москва, Батайский проезд 59, вход с противоположной стороны от
                подъездов, под вывеской «КОПИ ЦЕНТ», 7 минут пешком от метро
                Марьино
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
                    <img src="/public/icons/icon-nav-yandex.svg" alt="Яндекс карты" />
                </a>
                <a href="#" class="h-6 w-6 text-red-500">
                    <span class="sr-only">Google</span>
                    <img src="/public/icons/icons-nav-google.svg" alt="Google map" />
                </a>
                <a href="#" class="h-6 text-blue-500">
                    <span class="sr-only">2GIS</span>
                    <img src="/public/icons/icon-nav-2gis.svg" alt="Навигатор 2Gis" width="76" height="24" />
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

.text-blue-600 {
    color: #1882f0;
}
</style>

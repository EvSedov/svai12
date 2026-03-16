<script setup lang="ts">
const currentYear = new Date().getFullYear()

const navLinks = [
    { label: 'Главная', href: '/' },
    { label: 'О нас', href: '/about' },
    { label: 'Каталог свай', href: '/catalog' },
    { label: 'Примеры работ', href: '/portfolio' },
    { label: 'Отзывы', href: '/reviews' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Вопросы/Ответы', href: '/faq' },
]

const catalogLinks = [
    { label: 'Сваи 57 мм', href: '/catalog/57' },
    { label: 'Сваи 76 мм', href: '/catalog/76' },
    { label: 'Сваи 89 мм', href: '/catalog/89' },
    { label: 'Сваи 108 мм', href: '/catalog/108' },
    { label: 'Сваи 133 мм', href: '/catalog/133' },
    { label: 'Весь каталог', href: '/catalog' },
]
</script>

<template>
    <footer class="w-full border-t border-border-section py-10">
        <div class="mx-auto grid w-fit max-w-[1220px] grid-cols-1 gap-y-8 px-4
                    md:grid-cols-2 md:px-6
                    lg:gap-x-12 lg:px-8
                    xl:grid-cols-4 xl:gap-x-16">

            <!-- Колонка 1: Лого + соцсети + копирайт -->
            <div class="flex flex-col gap-6">
                <AtomsLogo />

                <div class="flex items-center gap-2">
                    <a href="https://vk.com/svai12" target="_blank" rel="noopener noreferrer" aria-label="ВКонтакте"
                        class="h-8 w-8 rounded-full border border-border-light flex items-center justify-center hover:border-brand hover:text-brand transition-colors text-xs font-bold text-content-secondary">
                        VK
                    </a>
                    <a href="https://t.me/svai12" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                        class="h-8 w-8 rounded-full bg-[#29A9EB] flex items-center justify-center hover:opacity-80 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.817l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.742z"/>
                        </svg>
                    </a>
                    <a href="https://wa.me/79021091101" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                        class="h-8 w-8 rounded-full bg-[#25D366] flex items-center justify-center hover:opacity-80 transition-opacity">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </a>
                </div>

                <span class="text-xs leading-relaxed text-content-secondary">
                    Copyright © 2024 – {{ currentYear }} svai12.ru
                </span>
            </div>

            <!-- Колонка 2: Контакты -->
            <div class="flex min-w-60 flex-col">
                <p class="mb-4 text-base font-semibold text-content-primary">Контакты</p>
                <ul class="flex flex-col gap-2">
                    <li>
                        <div class="flex items-center gap-2">
                            <a href="tel:+79021091101"
                                class="text-base font-semibold text-content-primary hover:text-brand transition-colors">
                                +7 (902) 109-11-01
                            </a>
                            <span class="flex gap-1">
                                <!-- WA -->
                                <span class="h-4 w-4 rounded-full bg-[#25D366] inline-flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                                </span>
                                <!-- TG -->
                                <span class="h-4 w-4 rounded-full bg-[#29A9EB] inline-flex items-center justify-center">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.817l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.742z"/></svg>
                                </span>
                            </span>
                        </div>
                    </li>
                    <li>
                        <a href="tel:+79778133227"
                            class="text-sm text-content-secondary hover:text-brand transition-colors">
                            +7 (977) 813-32-27
                        </a>
                    </li>
                    <li>
                        <a href="mailto:svai12@mail.ru"
                            class="text-sm font-semibold text-brand hover:underline transition-colors">
                            svai12@mail.ru
                        </a>
                    </li>
                    <li class="text-sm leading-relaxed text-content-secondary">
                        Республика Марий Эл,<br>
                        Оршанский р-н, д.Лужбеляк,<br>
                        ул. Центральная, 25
                    </li>
                </ul>
            </div>

            <!-- Колонка 3: Навигация -->
            <div class="flex flex-col">
                <p class="mb-4 text-base font-semibold text-content-primary">Информация</p>
                <ul class="flex flex-col gap-2">
                    <li v-for="link in navLinks" :key="link.href">
                        <NuxtLink :to="link.href"
                            class="text-sm text-content-secondary hover:text-brand transition-colors">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>

            <!-- Колонка 4: Каталог -->
            <div class="flex flex-col">
                <p class="mb-4 text-base font-semibold text-content-primary">Каталог свай</p>
                <ul class="flex flex-col gap-2">
                    <li v-for="link in catalogLinks" :key="link.href">
                        <NuxtLink :to="link.href"
                            class="text-sm text-content-secondary hover:text-brand transition-colors">
                            {{ link.label }}
                        </NuxtLink>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
</template>

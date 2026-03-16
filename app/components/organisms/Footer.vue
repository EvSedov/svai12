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
</script>

<template>
    <footer class="bg-content-primary text-white">
        <div class="container mx-auto px-4 py-12">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Brand -->
                <div>
                    <div class="text-2xl font-bold mb-3">
                        <span class="text-brand">СВАЙ</span><span>12</span>
                    </div>
                    <p class="text-sm text-white/70 leading-relaxed">
                        Профессиональный монтаж винтовых свай для любых объектов.
                        Надёжный фундамент за разумные деньги.
                    </p>
                    <div class="flex gap-3 mt-4">
                        <a
                            href="https://vk.com/svai12"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors text-sm font-bold"
                            aria-label="ВКонтакте"
                        >
                            VK
                        </a>
                        <a
                            href="https://t.me/svai12"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors text-sm font-bold"
                            aria-label="Telegram"
                        >
                            TG
                        </a>
                        <a
                            href="https://wa.me/79021091101"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand transition-colors text-sm font-bold"
                            aria-label="WhatsApp"
                        >
                            WA
                        </a>
                    </div>
                </div>

                <!-- Nav -->
                <div>
                    <h3 class="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Навигация</h3>
                    <ul class="space-y-2">
                        <li v-for="link in navLinks" :key="link.href">
                            <NuxtLink
                                :to="link.href"
                                class="text-sm text-white/70 hover:text-brand transition-colors"
                            >
                                {{ link.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </div>

                <!-- Contacts -->
                <div>
                    <h3 class="text-sm font-semibold uppercase tracking-wider text-white/50 mb-4">Контакты</h3>
                    <ul class="space-y-3 text-sm text-white/70">
                        <li>
                            <a href="tel:+79021091101" class="hover:text-brand transition-colors block">
                                +7 (902) 109-11-01
                            </a>
                        </li>
                        <li>
                            <a href="tel:+79778133227" class="hover:text-brand transition-colors block">
                                +7 (977) 813-32-27
                            </a>
                        </li>
                        <li>
                            <a href="mailto:svai12@mail.ru" class="hover:text-brand transition-colors block">
                                svai12@mail.ru
                            </a>
                        </li>
                        <li class="leading-relaxed">
                            Республика Марий Эл,<br>
                            Оршанский р-н, д.Лужбеляк,<br>
                            ул. Центральная, 25
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
                © {{ currentYear }} svai12.ru — Все права защищены
            </div>
        </div>
    </footer>
</template>

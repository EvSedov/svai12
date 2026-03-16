<script setup lang="ts">
const emit = defineEmits<{
    close: []
}>()

const navItems = [
    { label: 'Главная', href: '/' },
    { label: 'О нас', href: '/about' },
    { label: 'Каталог винтовых свай', href: '/catalog' },
    { label: 'Примеры работ', href: '/portfolio' },
    { label: 'Отзывы', href: '/reviews' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Вопросы/Ответы', href: '/faq' },
]
</script>

<template>
    <nav class="flex flex-col gap-1 py-4">
        <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="px-4 py-3 text-base font-medium text-content-primary hover:text-brand hover:bg-brand-light rounded-md transition-colors"
            @click="emit('close')"
        >
            {{ item.label }}
        </NuxtLink>

        <div class="mt-4 px-4 pt-4 border-t border-border-light">
            <a href="tel:+79021091101" class="flex items-center gap-2 py-2 text-content-primary hover:text-brand">
                <span class="text-brand">☎</span>
                <span class="font-medium">+7 (902) 109-11-01</span>
            </a>
            <a href="tel:+79778133227" class="flex items-center gap-2 py-2 text-content-primary hover:text-brand">
                <span class="text-brand">☎</span>
                <span class="font-medium">+7 (977) 813-32-27</span>
            </a>
        </div>
    </nav>
</template>

<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/atoms/ui/navigation-menu'

const navItems = [
    { label: 'Главная', href: '/' },
    { label: 'О нас', href: '/about' },
    { label: 'Примеры работ', href: '/portfolio' },
    { label: 'Отзывы', href: '/reviews' },
    { label: 'Контакты', href: '/contacts' },
    { label: 'Вопросы/Ответы', href: '/faq' },
]

const catalogItems = [
    { label: 'Сваи 57 мм', href: '/catalog/57' },
    { label: 'Сваи 76 мм', href: '/catalog/76' },
    { label: 'Сваи 89 мм', href: '/catalog/89' },
    { label: 'Сваи 108 мм', href: '/catalog/108' },
    { label: 'Сваи 133 мм', href: '/catalog/133' },
]

const route = useRoute()
const isCatalogActive = computed(() => route.path.startsWith('/catalog'))

const linkClass = 'px-3 py-2 text-sm text-content-primary hover:text-brand transition-colors'
const activeLinkClass = 'font-bold text-content-primary'
</script>

<template>
    <NavigationMenu>
        <NavigationMenuList class="gap-0">

            <!-- Простые пункты -->
            <NavigationMenuItem v-for="item in navItems.slice(0, 2)" :key="item.href">
                <NavigationMenuLink as-child>
                    <NuxtLink
                        :to="item.href"
                        :class="linkClass"
                        :exact-active-class="activeLinkClass"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <!-- Каталог с дропдауном -->
            <NavigationMenuItem>
                <NavigationMenuTrigger
                    :class="[linkClass, isCatalogActive && activeLinkClass]"
                >
                    Каталог винтовых свай
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul class="grid w-52 gap-0.5 p-2">
                        <li v-for="item in catalogItems" :key="item.href">
                            <NavigationMenuLink as-child>
                                <NuxtLink
                                    :to="item.href"
                                    class="block px-3 py-2 text-sm text-content-primary hover:text-brand hover:bg-brand-light rounded-md transition-colors"
                                    exact-active-class="font-semibold text-brand"
                                >
                                    {{ item.label }}
                                </NuxtLink>
                            </NavigationMenuLink>
                        </li>
                        <li class="border-t border-border-light mt-1 pt-1">
                            <NavigationMenuLink as-child>
                                <NuxtLink
                                    to="/catalog"
                                    class="block px-3 py-2 text-sm font-medium text-brand hover:bg-brand-light rounded-md transition-colors"
                                >
                                    Весь каталог →
                                </NuxtLink>
                            </NavigationMenuLink>
                        </li>
                    </ul>
                </NavigationMenuContent>
            </NavigationMenuItem>

            <!-- Остальные пункты -->
            <NavigationMenuItem v-for="item in navItems.slice(2)" :key="item.href">
                <NavigationMenuLink as-child>
                    <NuxtLink
                        :to="item.href"
                        :class="linkClass"
                        :exact-active-class="activeLinkClass"
                    >
                        {{ item.label }}
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>

        </NavigationMenuList>
    </NavigationMenu>
</template>

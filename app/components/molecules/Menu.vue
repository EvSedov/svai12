<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    NavigationMenuContent,
} from '@/components/atoms/ui/navigation-menu'

const catalogItems = [
    { label: 'Сваи 57 мм', href: '/catalog/57' },
    { label: 'Сваи 76 мм', href: '/catalog/76' },
    { label: 'Сваи 89 мм', href: '/catalog/89' },
    { label: 'Сваи 108 мм', href: '/catalog/108' },
    { label: 'Сваи 133 мм', href: '/catalog/133' },
]
</script>

<template>
    <NavigationMenu>
        <NavigationMenuList class="gap-1">
            <NavigationMenuItem>
                <NavigationMenuLink as-child>
                    <NuxtLink to="/" class="px-3 py-2 text-sm font-medium text-content-primary hover:text-brand transition-colors">
                        Главная
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink as-child>
                    <NuxtLink to="/about" class="px-3 py-2 text-sm font-medium text-content-primary hover:text-brand transition-colors">
                        О нас
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger class="px-3 py-2 text-sm font-medium text-content-primary hover:text-brand">
                    Каталог винтовых свай
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    <ul class="grid w-48 gap-1 p-2">
                        <li v-for="item in catalogItems" :key="item.href">
                            <NavigationMenuLink as-child>
                                <NuxtLink
                                    :to="item.href"
                                    class="block px-3 py-2 text-sm text-content-primary hover:text-brand hover:bg-brand-light rounded-md transition-colors"
                                >
                                    {{ item.label }}
                                </NuxtLink>
                            </NavigationMenuLink>
                        </li>
                        <li>
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

            <NavigationMenuItem>
                <NavigationMenuLink as-child>
                    <NuxtLink to="/portfolio" class="px-3 py-2 text-sm font-medium text-content-primary hover:text-brand transition-colors">
                        Примеры работ
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink as-child>
                    <NuxtLink to="/reviews" class="px-3 py-2 text-sm font-medium text-content-primary hover:text-brand transition-colors">
                        Отзывы
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink as-child>
                    <NuxtLink to="/contacts" class="px-3 py-2 text-sm font-medium text-content-primary hover:text-brand transition-colors">
                        Контакты
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuLink as-child>
                    <NuxtLink to="/faq" class="px-3 py-2 text-sm font-medium text-content-primary hover:text-brand transition-colors">
                        Вопросы/Ответы
                    </NuxtLink>
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

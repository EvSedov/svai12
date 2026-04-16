<script setup lang="ts">
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/Components/atoms/ui/navigation-menu";
import { scrollToSection } from "@/lib/utils";

const components: { title: string; href: string; description: string }[] = [
    {
        title: "Alert Dialog",
        href: "/docs/components/alert-dialog",
        description:
            "A modal dialog that interrupts the user with important content and expects a response.",
    },
    {
        title: "Hover Card",
        href: "/docs/components/hover-card",
        description:
            "For sighted users to preview content available behind a link.",
    },
    {
        title: "Progress",
        href: "/docs/components/progress",
        description:
            "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
    },
    {
        title: "Scroll-area",
        href: "/docs/components/scroll-area",
        description: "Visually or semantically separates content.",
    },
    {
        title: "Tabs",
        href: "/docs/components/tabs",
        description:
            "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
    },
    {
        title: "Tooltip",
        href: "/docs/components/tooltip",
        description:
            "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
    },
];

// Универсальная функция для обработки клика по навигационной ссылке
const handleNavigationClick = (event: Event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение
    const targetElement = event.currentTarget as HTMLAnchorElement;
    const href = targetElement.getAttribute('href');
    if (href && href.startsWith('#')) {
        scrollToSection(href);
    }
};
</script>

<template>
    <NavigationMenu>
        <NavigationMenuList class="flex-wrap gap-0 tracking-wider">
            <NavigationMenuItem>
                <NavigationMenuLink
                    href="#hero"
                    class="mx-0 pl-0"
                    :class="navigationMenuTriggerStyle()"
                    @click="handleNavigationClick"
                >
                    Главная
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink
                    href="#how-we-work"
                    class="mx-0 px-0"
                    :class="navigationMenuTriggerStyle()"
                    @click="handleNavigationClick"
                >
                    Как мы работаем?
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink
                    href="#examples"
                    :class="navigationMenuTriggerStyle()"
                    @click="handleNavigationClick"
                >
                    Наши работы и портфолио
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink
                    href="#contacts"
                    :class="navigationMenuTriggerStyle()"
                    @click="handleNavigationClick"
                >
                    Контакты
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink
                    href="#faqs"
                    :class="navigationMenuTriggerStyle()"
                    @click="handleNavigationClick"
                >
                    Часто задаваемые вопросы
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
</template>

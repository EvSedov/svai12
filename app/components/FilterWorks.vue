<script setup lang="ts">
import { ref, inject } from "vue";
import FilterButton from "@/components/FilterButton.vue";
import { Button } from "@/components/ui/button"; // Для кнопки "сделать заказ"

// Интерфейс для категории фильтра
interface FilterCategory {
    id: number;
    name: string;
    value: string;
    isActive: boolean;
    icon?: string;
}

// Данные для фильтров
const filterCategories = ref<FilterCategory[]>([
    { id: 1, name: "Визитки", value: "business-cards", isActive: false },
    {
        id: 2,
        name: "Листовая полиграфия",
        value: "sheet-printing",
        isActive: false,
    },
    {
        id: 3,
        name: "Многостраничная полиграфия",
        value: "multi-page-printing",
        isActive: false,
    },
    { id: 4, name: "Наклейки", value: "stickers", isActive: false },
    {
        id: 5,
        name: "Печать на акриле",
        value: "acrylic-printing",
        isActive: false,
    },
    { id: 6, name: "Упаковка", value: "packaging", isActive: false },
    {
        id: 7,
        name: "Пакеты и сумки",
        value: "bags-and-packages",
        isActive: false,
    },
    {
        id: 8,
        name: "Упаковочная бумага",
        value: "wrapping-paper",
        isActive: false,
    },
    {
        id: 9,
        name: "Офсетная печать",
        value: "offset-printing",
        isActive: false,
    },
    {
        id: 10,
        name: "Корпоративный мерч",
        value: "corporate-merch",
        isActive: false,
    },
    { id: 11, name: "Сувениры", value: "souvenirs", isActive: false },
    {
        id: 12,
        name: "Интерьерная печать",
        value: "interior-printing",
        isActive: false,
    },
    {
        id: 13,
        name: "Широкоформатная печать",
        value: "wide-format-printing",
        isActive: false,
    },
    { id: 14, name: "Календари", value: "calendars", isActive: false },
    { id: 15, name: "Одежда", value: "clothing", isActive: false },
    {
        id: 16,
        name: "Стенды Press wall, Roll Up",
        value: "stands-press-roll-up",
        isActive: false,
    },
    {
        id: 17,
        name: "Для художников",
        value: "for-artists",
        isActive: false,
        icon: "fire",
    },
    {
        id: 18,
        name: "Для свечей",
        value: "for-candles",
        isActive: false,
        icon: "candle",
    },
    {
        id: 19,
        name: "Для маркетплейсов",
        value: "for-marketplaces",
        isActive: false,
        icon: "box",
    },
    {
        id: 20,
        name: "Для выставок",
        value: "for-exhibitions",
        isActive: false,
        icon: "building",
    },
    {
        id: 21,
        name: "Для салонов красоты",
        value: "for-beauty-salons",
        isActive: false,
        icon: "nail",
    },
    {
        id: 22,
        name: "Для студентов",
        value: "for-students",
        isActive: false,
        icon: "backpack",
    },
    {
        id: 23,
        name: "Для мужчин",
        value: "for-men",
        isActive: false,
        icon: "backpack",
    },
    {
        id: 24,
        name: "Для женщин",
        value: "for-women",
        isActive: false,
        icon: "backpack",
    },
    // Новые категории на основе изображений
    { id: 25, name: "Открытки", value: "cards", isActive: false },
    { id: 26, name: "Приглашения", value: "invitations", isActive: false },
    { id: 27, name: "Листовки", value: "flyers", isActive: false },
    { id: 28, name: "Плакаты", value: "posters", isActive: false },
    { id: 29, name: "Билеты", value: "tickets", isActive: false },
    { id: 30, name: "Сертификаты", value: "certificates", isActive: false },
    { id: 31, name: "Дипломы", value: "diplomas", isActive: false },
    { id: 32, name: "Буклеты", value: "brochures", isActive: false },
    { id: 33, name: "Конверты", value: "envelopes", isActive: false },
    { id: 34, name: "Закладки", value: "bookmarks", isActive: false },
]);

const emit = defineEmits(["filters-changed"]); // Добавляем объявление события

// Логика обработки клика по кнопке фильтра
const handleFilterClick = (clickedValue: string) => {
    const index = filterCategories.value.findIndex(
        (cat) => cat.value === clickedValue,
    );
    if (index !== -1) {
        filterCategories.value[index].isActive =
            !filterCategories.value[index].isActive;
    }
    // Эмитируем событие, передавая массив активных фильтров
    const activeFilters = filterCategories.value
        .filter((cat) => cat.isActive)
        .map((cat) => cat.value);
    emit("filters-changed", activeFilters); // <--- Вот здесь происходит отправка данных
    console.log("Selected filters:", activeFilters);
};

// Инжектируем функцию открытия модального окна заказа, как в Header.vue
const openOrderModal = inject("openOrderModal") as () => void;
</script>

<template>
    <section id="examples" class="mt-40 bg-[#F7F7F7] px-4 py-16">
        <div class="container mx-auto max-w-[1590px] text-center">
            <!-- Заголовок секции -->
            <h2
                class="mb-10 text-4xl leading-8 font-semibold text-black lg:text-5xl"
            >
                Кажется пора взглянуть
                <span class="inline-block align-middle">👀</span> на наши работы
                и
                <Button
                    variant="link"
                    class="inline-block h-auto p-0 text-[#357CDB] hover:underline"
                    @click="openOrderModal"
                >
                    <h2
                        class="text-4xl leading-tight font-semibold lg:text-5xl"
                    >
                        сделать заказ
                    </h2>
                </Button>
            </h2>

            <!-- Блок с кнопками-фильтрами -->
            <div
                class="flex items-center space-x-4 overflow-x-auto px-4 py-2 pb-4 md:flex-wrap md:justify-center md:gap-x-4 md:space-x-0 md:gap-y-4 md:p-0"
            >
                <FilterButton
                    v-for="category in filterCategories"
                    :key="category.id"
                    :name="category.name"
                    :value="category.value"
                    :is-active="category.isActive"
                    :icon="category.icon"
                    @click="handleFilterClick"
                />
            </div>
        </div>
    </section>
</template>

<style scoped>
/* Дополнительные стили, если нужны */
</style>

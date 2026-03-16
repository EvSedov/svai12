<script lang="ts" setup>
import { ref, computed, defineProps } from "vue";

// Вспомогательная функция для генерации динамических путей к изображениям
const getImageUrl = (name: string) => {
    return `/images/examples/${name}`;
};

// Определяем пропсы, которые этот компонент будет принимать
interface Props {
    activeFilters: string[]; // Массив строк с активными значениями фильтров
}
const props = defineProps<Props>();

// Пример данных для футболок (вам нужно будет адаптировать это под свою реальную структуру данных)
interface ExampleProduct {
    id: number;
    name: string;
    image: string;
    category: string[];
}

const allProductsExamples = ref<ExampleProduct[]>([
    {
        id: 1,
        name: "👕 Сексуальная футболка",
        image: "t-shirts.jpg",
        category: ["clothing", "for-men"],
    },
    {
        id: 2,
        name: "👕 Аниме для мужчин",
        image: "undershirt-1.jpg",
        category: ["clothing", "anime", "for-men"],
    },
    {
        id: 3,
        name: "🔥 Любителям котиков",
        image: "undershirt-2.jpg",
        category: ["clothing", "for-women", "animals"],
    },
    {
        id: 4,
        name: "✨ Листовая 3D лак фольга",
        image: "listovaya-3d-lak-folga.png",
        category: ["sheet-printing"],
    },
    {
        id: 5,
        name: "📇 Печать визиток",
        image: "vizitki.png",
        category: ["business-cards"],
    },
    {
        id: 6,
        name: "🖨️ Печать листовок",
        image: "listovka.png",
        category: ["flyers", "sheet-printing"],
    },
    {
        id: 7,
        name: "📜 Печать приглашений",
        image: "priglasheniya.png",
        category: ["invitations", "sheet-printing"],
    },
    {
        id: 8,
        name: "📜 Печать открыток",
        image: "otkrytki.png",
        category: ["cards", "sheet-printing"],
    },
    {
        id: 9,
        name: "📖 Печать книжных закладок",
        image: "knizhnye-zakladki.png",
        category: ["bookmarks", "sheet-printing"],
    },
    {
        id: 10,
        name: "🏷️ Печать наклеек",
        image: "nakleyki.png",
        category: ["stickers"],
    },
    {
        id: 11,
        name: "✉️ Печать на конвертах",
        image: "konvert.png",
        category: ["envelopes", "sheet-printing"],
    },
    {
        id: 12,
        name: "📚 Буклеты и лифлеты",
        image: "bukleti.png",
        category: ["brochures", "multi-page-printing"],
    },
    {
        id: 13,
        name: "🔖 Печать бирок",
        image: "birka-oblozhka.png",
        category: ["packaging", "sheet-printing"],
    },
    {
        id: 14,
        name: "🃏 Печать колоды карт",
        image: "kolody_kart.png",
        category: ["multi-page-printing"],
    },
    {
        id: 15,
        name: "📄 Печать флаеров",
        image: "flayer.png",
        category: ["flyers", "sheet-printing"],
    },
    {
        id: 16,
        name: "🖼️ Печать афиш",
        image: "afisha.png",
        category: ["posters", "wide-format-printing", "interior-printing"],
    },
    {
        id: 17,
        name: "🏅 Печать дипломов",
        image: "diplom.png",
        category: ["diplomas", "sheet-printing"],
    },
    {
        id: 18,
        name: "🏆 Печать сертификатов",
        image: "pechat-sertifikatov.png",
        category: ["certificates", "sheet-printing"],
    },
    {
        id: 19,
        name: "🎟️ Печать билетов",
        image: "pechat-biletov.png",
        category: ["tickets", "sheet-printing"],
    },
    {
        id: 20,
        name: "🖨️ Печать плакатов",
        image: "pechat-plakatov.png",
        category: ["posters", "wide-format-printing", "interior-printing"],
    },
    {
        id: 21,
        name: "📄 Фирменные бланки",
        image: "blank.png",
        category: ["sheet-printing"],
    },
    {
        id: 22,
        name: "📁 Бумажные папки",
        image: "bumazhnye-papki-2.png",
        category: ["sheet-printing"],
    },
    {
        id: 23,
        name: "📁 Папки на кольцах",
        image: "papki-na-kolcah-2.png",
        category: ["sheet-printing"],
    },
    {
        id: 24,
        name: "📛 Печать бейджей",
        image: "bejdzhi-new-2.png",
        category: ["corporate-merch", "sheet-printing"],
    },
    {
        id: 25,
        name: "💳 Пластиковые карты",
        image: "main-small.png",
        category: ["corporate-merch", "business-cards"],
    },
]);

// Вычисляемое свойство для отображения отфильтрованных футболок
const filteredExamples = computed(() => {
    if (props.activeFilters.length === 0) {
        // Если нет активных фильтров, показываем все футболки
        return allProductsExamples.value;
    } else {
        // Фильтруем футболки: показываем только те, чьи категории пересекаются с активными фильтрами
        return allProductsExamples.value.filter((tshirt) =>
            props.activeFilters.some((filter) =>
                tshirt.category.includes(filter),
            ),
        );
    }
});
</script>
<template>
    <div class="w-full">
        <div
            class="mx-auto flex max-w-[1590px] flex-wrap justify-center gap-x-5.5 gap-y-5.5 px-2.5 pb-22.5 xl:justify-around"
        >
            <div
                v-for="example in filteredExamples"
                :key="example.id"
                class="relative h-89 w-89 overflow-hidden rounded-xl"
                :style="{
                    backgroundImage: `url(${getImageUrl(example.image)})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }"
            >
                <div
                    class="absolute top-0 right-0 bottom-0 left-0 flex items-end bg-black/25"
                >
                    <p class="mb-4 ml-5 text-lg font-semibold text-white">
                        {{ example.name }}
                    </p>
                </div>
            </div>
            <!-- Пустые элементы для выравнивания последнего ряда по левому краю на больших экранах -->
            <div
                v-for="n in 3"
                :key="`dummy-${n}`"
                class="hidden w-89 xl:block"
            ></div>
        </div>
    </div>
</template>
<style scoped>
h2 {
    font-family: "Commissioner";
}
</style>

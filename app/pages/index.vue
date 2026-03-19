<script setup lang="ts">
import { ref } from "vue";

const currentActiveFilters = ref<string[]>([]);
const handleFiltersUpdate = (activeFilters: string[]) => {
    currentActiveFilters.value = activeFilters;
};

const siteUrl = "https://evsedov.github.io/svai12";

useSeoMeta({
    title: "Монтаж и продажа винтовых свай в Чебоксарах",
    description:
        "Монтаж винтовых свай в Чебоксарах с опытом 15+ лет. Сваи ф57–159 мм. Расчёт бесплатно. Звоните: +7 (902) 109-11-01",
    ogTitle: "Монтаж и продажа винтовых свай в Чебоксарах | СВАИ+",
    ogDescription:
        "Монтаж винтовых свай в Чебоксарах с опытом 15+ лет. Сваи ф57–159 мм. Расчёт бесплатно. Звоните: +7 (902) 109-11-01",
    ogType: "website",
    ogUrl: siteUrl,
    ogImage: `${siteUrl}/images/hero-bg.jpg`,
    twitterCard: "summary_large_image",
});

useHead({
    script: [
        {
            type: "application/ld+json",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "СВАИ+",
                url: siteUrl,
                telephone: "+7-902-109-11-01",
                email: "svai12@mail.ru",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "улица 10-ой Пятилетки 2, кор. 5, строение 1",
                    addressLocality: "Чебоксары",
                    addressRegion: "Чувашская Республика",
                    addressCountry: "RU",
                },
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: [
                            "Понедельник",
                            "Вторник",
                            "Среда",
                            "Четверг",
                            "Пятница",
                        ],
                        opens: "11:00",
                        closes: "22:00",
                    },
                ],
                image: `${siteUrl}/images/hero-bg.jpg`,
            }),
        },
    ],
});
</script>

<template>
    <div class="wrap">
        <SectionsHeroSvai />
        <SectionsHowWeWork />
        <FilterWorks @filters-changed="handleFiltersUpdate" />
        <SectionsExamplesProducts :active-filters="currentActiveFilters" />
        <SectionsWorksSection />
        <SectionsContactInfo />
        <!--<SectionsPaymentMethods />-->
    </div>
</template>

<style scoped lang="css">
.main {
    width: 100%;
}

.wrap {
    width: 100%;
    margin: 0 auto;
}
</style>

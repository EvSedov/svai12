<script setup lang="ts">
import ReviewCard from "@/components/ReviewCard.vue";
import Button from "@/components/ui/button/Button.vue";
import { reviews } from "@/data/reviews";
</script>

<template>
    <section class="bg-bg-main px-4 pt-18 pb-12.5 md:px-6 md:pt-22 md:pb-12.5 lg:px-8 lg:pt-26 lg:pb-12.5">
        <div class="mx-auto max-w-395">
            <h2
                class="mb-12 text-center font-montserrat text-hero-title-tablet font-semibold leading-8 tracking-[0.02em] text-black md:mb-16 md:text-hero-title-desktop"
            >
                Отзывы
            </h2>

            <div class="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <ReviewCard
                    v-for="review in reviews"
                    :key="review.id"
                    :name="review.name"
                    :role="review.role"
                    :rating="review.rating"
                    :title="review.title"
                    :text="review.text"
                />
            </div>

            <div class="flex justify-center">
                <Button
                    class="h-14 rounded-2xl bg-brand px-16.5 has-[>svg]:px-16.5 font-[SF_Pro_Display] text-4 font-bold leading-none tracking-normal text-white hover:bg-brand-border"
                >
                    Оставить отзыв
                    <svg xmlns="http://www.w3.org/2000/svg" class="ml-2 h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                </Button>
            </div>
        </div>
    </section>
</template>

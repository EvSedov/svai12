<script setup lang="ts">
import ReviewCard from "@/components/ReviewCard.vue";
import { reviews } from "@/data/reviews";
</script>

<template>
    <section id="reviews" class="bg-bg-main px-4 pt-18 pb-12.5 md:px-6 md:pt-22 md:pb-12.5 lg:px-8 lg:pt-26 lg:pb-12.5">
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
        </div>
    </section>
</template>

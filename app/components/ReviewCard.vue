<script setup lang="ts">
interface Props {
    name: string;
    role: string;
    rating: number;
    title: string;
    text: string;
}

const props = defineProps<Props>();
</script>

<template>
    <article class="flex flex-col rounded-[10px] bg-white p-6 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
        <div class="mb-4 flex items-center gap-3">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                    <path
                        d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
            </div>
            <div>
                <p class="font-semibold leading-tight text-black/80">{{ props.name }}</p>
                <p class="text-3.5 text-black/50">{{ props.role }}</p>
            </div>
        </div>

        <div class="mb-3 flex gap-1">
            <svg v-for="i in props.rating" :key="i" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-brand"
                viewBox="0 0 24 24" fill="currentColor">
                <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
        </div>

        <h3 class="mb-2 font-montserrat text-5 font-semibold leading-snug tracking-[0.02em] text-black/80">
            {{ props.title }}
        </h3>

        <p class="text-4 leading-relaxed tracking-[0.01em] text-black/60 italic">
            {{ props.text }}
        </p>
    </article>
</template>

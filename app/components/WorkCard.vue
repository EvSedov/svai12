<script setup lang="ts">
interface Props {
    imageSrc: string;
    imageAlt?: string;
    title: string;
}

const props = withDefaults(defineProps<Props>(), {
    imageAlt: "",
});

defineEmits<{
    open: [];
}>();
</script>

<template>
    <article
        class="flex w-full cursor-pointer flex-col overflow-hidden rounded-[14px] bg-white shadow-[0_12px_32px_rgba(44,44,44,0.12)] transition-transform duration-300 hover:-translate-y-1"
        @click="$emit('open')"
    >
        <div class="aspect-[4/3] w-full overflow-hidden bg-bg-main">
            <img
                :src="props.imageSrc"
                :alt="props.imageAlt || props.title"
                class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
        </div>

        <div class="p-5 md:p-6">
            <p class="mb-2 text-3.5 font-semibold tracking-[0.12em] text-brand uppercase">
                Адрес
            </p>

            <h3 class="font-montserrat text-5.5 leading-snug font-semibold tracking-[0.02em] text-black/80">
                {{ props.title }}
            </h3>
        </div>
    </article>
</template>

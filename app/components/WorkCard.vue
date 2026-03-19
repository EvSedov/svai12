<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";

interface Props {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    buttonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
    imageAlt: "",
    buttonLabel: "Узнать подробнее",
});

defineEmits<{
    details: [];
}>();
</script>

<template>
    <article class="flex w-full max-w-148.75 flex-col overflow-hidden rounded-[10px] bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]">
        <div class="aspect-video w-full overflow-hidden">
            <img
                :src="props.imageSrc"
                :alt="props.imageAlt || props.title"
                class="h-full w-full object-cover"
            />
        </div>

        <div class="flex flex-1 flex-col p-6">
            <h3 class="mb-3 font-montserrat text-6 leading-snug font-semibold tracking-[0.02em] text-black/80">
                {{ props.title }}
            </h3>

            <p class="mb-6 flex-1 text-5 leading-relaxed tracking-[0.01em] text-black/60">
                {{ props.description }}
            </p>

            <Button
                class="h-14 w-full rounded-2xl border-2 border-brand-border bg-brand text-8 leading-none font-semibold tracking-[0.02em] text-white hover:bg-brand-border"
                @click="$emit('details')"
            >
                {{ props.buttonLabel }}
            </Button>
        </div>
    </article>
</template>

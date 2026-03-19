<script setup lang="ts">
import Button from "@/components/ui/button/Button.vue";

interface Props {
    name: string;
    value: string;
    isActive: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isActive: false,
});

const emit = defineEmits(["click"]);

const handleClick = () => {
    emit("click", props.value);
};
</script>

<template>
    <Button
        :variant="isActive ? 'default' : 'outline'"
        :class="[
            isActive
                ? 'border-2 border-brand-border bg-brand text-white hover:bg-brand-border'
                : 'border-2 border-black/45 bg-white text-black/65 hover:bg-black/4',
            'h-10 rounded-2xl px-6 text-5 leading-none font-medium tracking-[0.02em] shadow-none',
        ]"
        @click="handleClick"
    >
        {{ props.name }}
    </Button>
</template>

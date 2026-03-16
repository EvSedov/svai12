<script setup lang="ts">
import { ref } from 'vue';
import AccordionHeader from '@/components/atoms/AccordionHeader.vue';
import AccordionItem from '@/components/molecules/AccordionItem.vue';

const props = defineProps<{
    items: Array<{
        question: string;
        answer: string;
    }>;
}>();

const openQuestion = ref<number | null>(null);

const toggleQuestion = (index: number) => {
    openQuestion.value = openQuestion.value === index ? null : index;
};
</script>

<template>
    <div>
        <AccordionHeader title="Ответы на частые вопросы" />

        <div class="space-y-0">
            <AccordionItem
                v-for="(item, index) in items"
                :key="index"
                :question="item.question"
                :answer="item.answer"
                :is-open="openQuestion === index"
                @toggle="toggleQuestion(index)"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AccordionHeader from '@/components/AccordionHeader.vue';
import AccordionItem from '@/components/AccordionItem.vue';
import type { FaqGroup } from '@/data/faq';

const props = defineProps<{
    groups: FaqGroup[];
}>();

const openQuestion = ref<string | null>(null);

const toggleQuestion = (key: string) => {
    openQuestion.value = openQuestion.value === key ? null : key;
};
</script>

<template>
    <div>
        <AccordionHeader title="Ответы на частые вопросы" />

        <div class="space-y-6">
            <section v-for="(group, groupIndex) in props.groups" :key="group.title">
                <h4 class="text-[28px] font-bold tracking-wide text-brand">
                    {{ group.title }}
                </h4>

                <div class="space-y-0">
                    <AccordionItem
                        v-for="(item, itemIndex) in group.items"
                        :key="`${group.title}-${item.question}`"
                        :question="item.question"
                        :answer="item.answer"
                        :is-open="openQuestion === `${groupIndex}-${itemIndex}`"
                        @toggle="toggleQuestion(`${groupIndex}-${itemIndex}`)"
                    />
                </div>
            </section>
        </div>
    </div>
</template>

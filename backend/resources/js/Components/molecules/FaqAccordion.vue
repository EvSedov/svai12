<script setup lang="ts">
import { ref } from 'vue';
import AccordionHeader from '@/Components/atoms/AccordionHeader.vue';
import AccordionItem from '@/Components/molecules/AccordionItem.vue';

// Пропсы для компонента
const props = defineProps<{
  items: Array<{
    question: string;
    answer: string;
  }>;
}>();

// Состояние для аккордеона FAQ
const openQuestion = ref<number | null>(null);

// Функция для переключения открытого вопроса
const toggleQuestion = (index: number) => {
  openQuestion.value = openQuestion.value === index ? null : index;
};
</script>

<template>
  <div>
    <AccordionHeader title="Ответы на частые вопросы" />
    
    <!-- Аккордеон с вопросами -->
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
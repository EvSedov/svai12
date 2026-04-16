<script setup lang="ts">
import AccordionQuestion from '@/Components/molecules/AccordionQuestion.vue';
import AccordionAnswer from '@/Components/molecules/AccordionAnswer.vue';

defineProps<{
  question: string;
  answer: string;
  isOpen: boolean;
}>();

defineEmits<{
  (e: 'toggle'): void;
}>();
</script>

<template>
  <div class="border-b border-gray-200">
    <AccordionQuestion 
      :question="question" 
      :is-open="isOpen" 
      @toggle="$emit('toggle')" 
    />
    <AccordionAnswer 
      :answer="answer" 
      :is-visible="isOpen" 
    />
  </div>
</template> 
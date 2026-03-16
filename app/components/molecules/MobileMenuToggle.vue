<script setup lang="ts">
import { ref, provide } from 'vue'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/atoms/ui/sheet'
import { Button } from '@/components/atoms/ui/button'

const isOpen = ref(false)
const closeSheet = () => { isOpen.value = false }
provide('closeSheet', closeSheet)
</script>

<template>
    <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
            <button
                type="button"
                class="flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded-md hover:bg-bg-main transition-colors"
                :aria-label="isOpen ? 'Закрыть меню' : 'Открыть меню'"
                :aria-expanded="isOpen"
            >
                <span class="block w-6 h-0.5 bg-content-primary transition-all duration-200"
                    :class="isOpen ? 'translate-y-2 rotate-45' : ''" />
                <span class="block w-6 h-0.5 bg-content-primary transition-all duration-200"
                    :class="isOpen ? 'opacity-0' : ''" />
                <span class="block w-6 h-0.5 bg-content-primary transition-all duration-200"
                    :class="isOpen ? '-translate-y-2 -rotate-45' : ''" />
            </button>
        </SheetTrigger>
        <SheetContent side="left" class="w-80 p-0">
            <SheetHeader class="px-4 py-4 border-b border-border-light">
                <SheetTitle class="text-left">
                    <AtomsLogo />
                </SheetTitle>
            </SheetHeader>
            <MoleculesMobileMenuContent @close="closeSheet" />
            <div class="px-4 py-4 border-t border-border-light">
                <Button class="w-full bg-brand hover:bg-brand/90 text-white font-semibold gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .16h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    Обратный звонок
                </Button>
            </div>
        </SheetContent>
    </Sheet>
</template>

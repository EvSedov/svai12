<script setup lang="ts">
import { ref, provide } from "vue";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/Components/atoms/ui/sheet";
import { Button } from "@/Components/atoms/ui/button";
import { MenuIcon } from "lucide-vue-next";
import MobileMenuContent from "@/Components/molecules/MobileMenuContent.vue";

const isOpen = ref(false);
const closeSheet = () => {
    isOpen.value = false;
};
provide("closeSheet", closeSheet);
</script>

<template>
    <Sheet v-model:open="isOpen" :prevent-scroll-on-entry-focus="true">
        <SheetTrigger as-child>
            <Button variant="outline" size="icon">
                <MenuIcon class="h-6 w-6" />
                <span class="sr-only">Toggle menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left">
            <SheetHeader>
                <SheetTitle>Мобильное меню</SheetTitle>
                <SheetDescription>Навигация по сайту</SheetDescription>
            </SheetHeader>
            <MobileMenuContent />
        </SheetContent>
    </Sheet>
</template>

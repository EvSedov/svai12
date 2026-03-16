<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from '@/components/atoms/ui/sheet'
import { Button } from '@/components/atoms/ui/button'

const mobileMenuOpen = ref(false)
</script>

<template>
    <header class="sticky top-0 z-50 bg-bg-white border-b border-border-light">
        <div class="container mx-auto px-4">
            <div class="flex items-center justify-between h-16 lg:h-20">
                <!-- Logo -->
                <AtomsLogo />

                <!-- Desktop Nav -->
                <nav class="hidden lg:flex">
                    <MoleculesMenu />
                </nav>

                <!-- Desktop contacts + CTA -->
                <div class="hidden lg:flex items-center gap-4">
                    <div class="flex flex-col items-end text-sm">
                        <a href="tel:+79021091101" class="font-semibold text-content-primary hover:text-brand transition-colors">
                            +7 (902) 109-11-01
                        </a>
                        <a href="mailto:svai12@mail.ru" class="text-content-secondary hover:text-brand transition-colors">
                            svai12@mail.ru
                        </a>
                    </div>
                    <Button class="bg-brand hover:bg-brand/90 text-white font-semibold px-5 py-2.5">
                        Обратный звонок
                    </Button>
                </div>

                <!-- Mobile menu toggle -->
                <div class="lg:hidden">
                    <Sheet v-model:open="mobileMenuOpen">
                        <SheetTrigger as-child>
                            <MoleculesMobileMenuToggle :open="mobileMenuOpen" @toggle="mobileMenuOpen = !mobileMenuOpen" />
                        </SheetTrigger>
                        <SheetContent side="left" class="w-80 p-0">
                            <div class="px-4 py-4 border-b border-border-light">
                                <AtomsLogo />
                            </div>
                            <MoleculesMobileMenuContent @close="mobileMenuOpen = false" />
                            <div class="px-4 py-4 border-t border-border-light">
                                <Button class="w-full bg-brand hover:bg-brand/90 text-white font-semibold">
                                    Обратный звонок
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    </header>
</template>

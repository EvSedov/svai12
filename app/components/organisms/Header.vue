<script setup lang="ts">
import { Button } from '@/components/atoms/ui/button'
</script>

<template>
    <header class="sticky top-0 z-50 bg-bg-white border-b border-border-light">
        <div class="mx-auto max-w-[1590px] px-4 flex items-center gap-4 h-[60px] xl:h-[72px]">

            <!-- Лого -->
            <AtomsLogo class="mr-6 xl:mr-10" />

            <!-- Десктоп навигация -->
            <MoleculesMenu class="mr-auto hidden xl:flex" />

            <!-- Контакты + CTA (md+) -->
            <div class="hidden md:flex items-center gap-3 ml-auto xl:ml-0">
                <!-- Иконки соцсетей -->
                <div class="flex items-center gap-1.5">
                    <a href="https://t.me/svai12" target="_blank" rel="noopener noreferrer" aria-label="Telegram"
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-[#29A9EB] hover:opacity-80 transition-opacity shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.17 13.817l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.978.742z"/>
                        </svg>
                    </a>
                    <a href="https://wa.me/79021091101" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                        class="w-8 h-8 flex items-center justify-center rounded-full bg-[#25D366] hover:opacity-80 transition-opacity shrink-0">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                    </a>
                </div>

                <!-- Телефон + email -->
                <div class="flex flex-col items-start leading-tight">
                    <a href="tel:+79021091101"
                        class="font-semibold text-sm text-content-primary hover:text-brand transition-colors whitespace-nowrap">
                        +7 (902)-109-11-01
                    </a>
                    <a href="mailto:svai12@mail.ru"
                        class="text-xs text-content-secondary hover:text-brand transition-colors uppercase tracking-wide">
                        svai12@mail.ru
                    </a>
                </div>

                <!-- CTA -->
                <Button class="bg-brand hover:bg-brand/90 text-white font-semibold px-4 py-2.5 gap-2 rounded-md">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .16h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                    </svg>
                    Обратный звонок
                </Button>
            </div>

            <!-- Мобильный бургер -->
            <div class="ml-auto xl:hidden">
                <MoleculesMobileMenuToggle />
            </div>
        </div>
    </header>
</template>

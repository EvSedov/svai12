<template>
    <div class="flex flex-col min-h-screen bg-bg-main">
        <OrganismsHeader />
        <main class="flex-1">
            <slot />
        </main>
        <OrganismsFooter />
    </div>
</template>

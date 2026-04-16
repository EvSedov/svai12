<template>
    <Teleport to="body">
        <div class="fixed top-4 right-4 z-50 space-y-2">
            <TransitionGroup name="notification" tag="div" class="space-y-2">
                <div
                    v-for="notification in notifications"
                    :key="notification.id"
                    :class="[
                        'ring-opacity-5 pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black',
                        getNotificationClasses(notification.type),
                    ]"
                >
                    <div class="p-4">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <component
                                    :is="getIcon(notification.type)"
                                    class="h-6 w-6"
                                />
                            </div>
                            <div class="ml-3 flex-1 pt-0.5">
                                <p class="text-sm font-medium text-gray-900">
                                    {{ notification.title }}
                                </p>
                                <p class="mt-1 text-sm text-gray-500">
                                    {{ notification.message }}
                                </p>
                            </div>
                            <div class="ml-4 flex flex-shrink-0 self-start">
                                <button
                                    @click="removeNotification(notification.id)"
                                    class="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    <span class="sr-only">Закрыть</span>
                                    <XMarkIcon class="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                    <!-- Прогресс-бар для автоматического закрытия -->
                    <div
                        v-if="
                            notification.duration && notification.duration > 0
                        "
                        class="h-1 bg-gray-200"
                    >
                        <div
                            :class="[
                                'h-full transition-all ease-linear',
                                getProgressBarClass(notification.type),
                            ]"
                            :style="{
                                width: '100%',
                                animation: `shrink ${notification.duration}ms linear forwards`,
                            }"
                        ></div>
                    </div>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import CheckCircleIcon from "../../icons/CheckCircleIcon.vue";
import ExclamationTriangleIcon from "../../icons/ExclamationTriangleIcon.vue";
import XCircleIcon from "../../icons/XCircleIcon.vue";
import InformationCircleIcon from "../../icons/InformationCircleIcon.vue";
import XMarkIcon from "../../icons/XMarkIcon.vue";
import {
    errorNotificationManager,
    type ErrorNotification,
} from "../../../../lib/errorHandler.js";

const notifications = ref<ErrorNotification[]>([]);
let unsubscribe: (() => void) | null = null;

function removeNotification(id: string) {
    errorNotificationManager.removeNotification(id);
}

function getIcon(type: string) {
    switch (type) {
        case "success":
            return CheckCircleIcon;
        case "warning":
            return ExclamationTriangleIcon;
        case "error":
            return XCircleIcon;
        case "info":
            return InformationCircleIcon;
        default:
            return InformationCircleIcon;
    }
}

function getNotificationClasses(type: string): string {
    switch (type) {
        case "success":
            return "border-l-4 border-green-400";
        case "warning":
            return "border-l-4 border-yellow-400";
        case "error":
            return "border-l-4 border-red-400";
        case "info":
            return "border-l-4 border-blue-400";
        default:
            return "border-l-4 border-gray-400";
    }
}

function getProgressBarClass(type: string): string {
    switch (type) {
        case "success":
            return "bg-green-400";
        case "warning":
            return "bg-yellow-400";
        case "error":
            return "bg-red-400";
        case "info":
            return "bg-blue-400";
        default:
            return "bg-gray-400";
    }
}

onMounted(() => {
    notifications.value = errorNotificationManager.getNotifications();
    unsubscribe = errorNotificationManager.subscribe((newNotifications) => {
        notifications.value = newNotifications;
    });
});

onUnmounted(() => {
    if (unsubscribe) {
        unsubscribe();
    }
});
</script>

<style scoped>
.notification-enter-active,
.notification-leave-active {
    transition: all 0.3s ease;
}

.notification-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.notification-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

@keyframes shrink {
    from {
        width: 100%;
    }
    to {
        width: 0%;
    }
}
</style>

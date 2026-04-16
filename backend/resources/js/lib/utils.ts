import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const scrollToSection = (targetId: string) => {
    if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Используем scrollIntoView для более надежной плавной прокрутки
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
        }
    }
};

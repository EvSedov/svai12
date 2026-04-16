import axios from "axios";
import {
    setupAxiosErrorInterceptor,
    setupGlobalErrorHandler,
} from "./lib/errorHandler.js";

window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// Ensure CSRF and JSON Accept headers are set for Laravel
const csrf = document.head.querySelector('meta[name="csrf-token"]');
if (csrf && csrf.getAttribute("content")) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] =
        csrf.getAttribute("content");
}
window.axios.defaults.headers.common["Accept"] = "application/json";

// Настройка обработки ошибок
setupGlobalErrorHandler();
setupAxiosErrorInterceptor(window.axios);

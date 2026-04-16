import path from "node:path";
import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import laravel from "laravel-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import vueDevTools from "vite-plugin-vue-devtools";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
            resolve: (name) => {
                const pages = import.meta.glob("./Pages/**/*.vue", {
                    eager: true,
                });
                return pages[`./Pages/${name}.vue`];
            },
        }),
        vuePlugin(),
        tailwindcss(),
        vueDevTools({
            appendTo: "resources/js/app.js",
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "resources/js"),
        },
    },
});

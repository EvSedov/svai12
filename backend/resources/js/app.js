import "./bootstrap.js";
import "./lib/globalTestExports.js";

import { createApp, h } from "vue";
import { createInertiaApp } from "@inertiajs/vue3";
import NotificationContainer from "./Components/atoms/ui/notification/NotificationContainer.vue";

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
        return pages[`./Pages/${name}.vue`];
    },
    setup({ el, App, props, plugin }) {
        const app = createApp({
            render: () => [h(App, props), h(NotificationContainer)],
        });

        app.use(plugin);
        app.mount(el);
    },
});

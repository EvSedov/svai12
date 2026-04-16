import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", component: () => import("../components/App.vue") },
    { path: "/home", component: () => import("../components/Home.vue") },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

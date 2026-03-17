import { joinURL } from "ufo";

export const usePublicAsset = () => {
    const { app } = useRuntimeConfig();

    return (path: string) => {
        const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

        return joinURL(app.baseURL || "/", normalizedPath);
    };
};

import {
    createError,
    defineEventHandler,
    getRequestHeader,
    readFormData,
    setResponseStatus,
} from "h3";

export default defineEventHandler(async (event) => {
    const runtimeConfig = useRuntimeConfig(event);
    const submitUrl = runtimeConfig.ordersSubmitUrl;

    if (!submitUrl) {
        throw createError({
            statusCode: 500,
            statusMessage: "NUXT_ORDERS_SUBMIT_URL is not configured",
        });
    }

    const formData = await readFormData(event);
    const forwardedFor =
        getRequestHeader(event, "x-forwarded-for") ??
        event.node.req.socket.remoteAddress ??
        "";
    const userAgent = getRequestHeader(event, "user-agent") ?? "";

    const response = await fetch(submitUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "X-Forwarded-For": forwardedFor,
            "User-Agent": userAgent,
        },
        body: formData,
    });

    setResponseStatus(event, response.status, response.statusText);

    const contentType = response.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
        return await response.json();
    }

    return {
        message: await response.text(),
    };
});

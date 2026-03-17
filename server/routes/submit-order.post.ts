import {
    defineEventHandler,
    readBody,
    setResponseStatus,
} from "h3";

interface SubmitOrderBody {
    fullName?: string;
    selectedService?: string;
    phoneNumber?: string;
    description?: string;
    quantity?: number | null;
    agree?: boolean;
    discount?: number;
}

// Temporary mock endpoint for local/frontend development until the real backend exists.
export default defineEventHandler(async (event) => {
    const body = await readBody<SubmitOrderBody>(event);

    if (!body?.fullName || !body?.phoneNumber || !body?.selectedService) {
        setResponseStatus(event, 400);
        return {
            errors: {
                fullName: !body?.fullName ? "Укажите имя" : undefined,
                selectedService: !body?.selectedService
                    ? "Выберите услугу"
                    : undefined,
                phoneNumber: !body?.phoneNumber
                    ? "Укажите телефон"
                    : undefined,
            },
        };
    }

    return {
        ok: true,
        message: "Mock order accepted",
        order: {
            fullName: body.fullName,
            selectedService: body.selectedService,
            phoneNumber: body.phoneNumber,
            description: body.description ?? "",
            quantity: body.quantity ?? null,
            agree: Boolean(body.agree),
            discount: body.discount ?? 0,
        },
    };
});

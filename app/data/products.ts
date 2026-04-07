export interface SvaiProduct {
    id: number;
    title: string;
    imageSrc: string;
    badge: string;
    inStock?: boolean;
    stockLabel?: string;
    lengths: number[];
    basePrice: string;
    installPrice: string;
    priceRows?: SvaiPriceRow[];
    defaultCap?: string;
    capOptions?: string[];
    capPrices?: CapPrice[];
    capSelectionNote?: string;
    withoutCapDiscount?: string;
    category: string[];
}

export interface SvaiPriceRow {
    length: number;
    price: string;
}

export interface CapPrice {
    size: string;
    price: string;
}

export interface OgolovokProduct {
    id: number;
    title: string;
    imageSrc: string;
    badge: string;
    thickness: string;
    price: string;
    category: string[];
}

export const createSvaiProducts = (assetPath: (path: string) => string): SvaiProduct[] => [
    {
        id: 1,
        title: "Сваи 57",
        imageSrc: assetPath("/images/products/svai-57.png"),
        badge: "ПОД ЗАКАЗ",
        inStock: false,
        stockLabel: "Под заказ",
        lengths: [1500, 2000, 2500],
        basePrice: "от 1250 руб.",
        installPrice: "от 2100 руб.",
        category: ["screw-piles"],
    },
    {
        id: 2,
        title: "Сваи 76",
        imageSrc: assetPath("/images/products/svai-76.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        basePrice: "от 1750 руб.",
        installPrice: "от 2700 руб.",
        priceRows: [
            { length: 1500, price: "2700 руб." },
            { length: 2000, price: "3100 руб." },
            { length: 2500, price: "3600 руб." },
            { length: 3000, price: "4200 руб." },
            { length: 3500, price: "4700 руб." },
            { length: 4000, price: "5500 руб." },
            { length: 4500, price: "6300 руб." },
            { length: 5000, price: "7300 руб." },
        ],
        defaultCap: "150×150",
        capPrices: [{ size: "150×150", price: "100 руб." }],
        category: ["screw-piles"],
    },
    {
        id: 3,
        title: "Сваи 89",
        imageSrc: assetPath("/images/products/svai-89.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        basePrice: "от 2100 руб.",
        installPrice: "от 3000 руб.",
        priceRows: [
            { length: 1500, price: "3000 руб." },
            { length: 2000, price: "3500 руб." },
            { length: 2500, price: "4100 руб." },
            { length: 3000, price: "4800 руб." },
            { length: 3500, price: "5400 руб." },
            { length: 4000, price: "6100 руб." },
            { length: 4500, price: "6800 руб." },
            { length: 5000, price: "7800 руб." },
        ],
        capOptions: ["150×150", "200×200"],
        capPrices: [
            { size: "150×150", price: "100 руб." },
            { size: "200×200", price: "200 руб." },
        ],
        capSelectionNote: "на выбор",
        category: ["screw-piles"],
    },
    {
        id: 4,
        title: "Сваи 108",
        imageSrc: assetPath("/images/products/svai-108.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        basePrice: "от 2550 руб.",
        installPrice: "от 3500 руб.",
        priceRows: [
            { length: 1500, price: "3500 руб." },
            { length: 2000, price: "4200 руб." },
            { length: 2500, price: "4900 руб." },
            { length: 3000, price: "5600 руб." },
            { length: 3500, price: "6400 руб." },
            { length: 4000, price: "7200 руб." },
            { length: 4500, price: "8000 руб." },
            { length: 5000, price: "9000 руб." },
        ],
        defaultCap: "200×200",
        capPrices: [{ size: "200×200", price: "200 руб." }],
        category: ["screw-piles"],
    },
    {
        id: 5,
        title: "Сваи 133",
        imageSrc: assetPath("/images/products/svai-133.png"),
        badge: "АКЦИЯ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000],
        basePrice: "от 3150 руб.",
        installPrice: "от 3900 руб.",
        priceRows: [
            { length: 1500, price: "3900 руб." },
            { length: 2000, price: "4800 руб." },
            { length: 2500, price: "5700 руб." },
            { length: 3000, price: "6600 руб." },
            { length: 3500, price: "7600 руб." },
            { length: 4000, price: "8600 руб." },
            { length: 4500, price: "9700 руб." },
            { length: 5000, price: "9800 руб." },
        ],
        capOptions: ["200×200", "250×250"],
        capPrices: [
            { size: "200×200", price: "200 руб." },
            { size: "250×250", price: "300 руб." },
        ],
        capSelectionNote: "на выбор",
        withoutCapDiscount: "-100 руб.",
        category: ["screw-piles"],
    },
    {
        id: 6,
        title: "Сваи 159",
        imageSrc: assetPath("/images/products/svai-159.png"),
        badge: "ПОД ЗАКАЗ",
        inStock: false,
        stockLabel: "Под заказ",
        lengths: [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000],
        basePrice: "по запросу",
        installPrice: "от 6475 руб.",
        capPrices: [{ size: "250×250", price: "300 руб." }],
        capSelectionNote: "другие размеры",
        category: ["screw-piles"],
    },
];

export const createOgolovokProducts = (assetPath: (path: string) => string): OgolovokProduct[] => [
    {
        id: 101,
        title: "Оголовок под сваю ф57 (100х100 \\ 150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-57.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 100 руб.",
        category: ["caps"],
    },
    {
        id: 102,
        title: "Оголовок под сваю ф76 (150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-76.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 100 руб.",
        category: ["caps"],
    },
    {
        id: 103,
        title: "Оголовок под сваю ф89 (150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-89.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 100 руб.",
        category: ["caps"],
    },
    {
        id: 104,
        title: "Оголовок под сваю ф108 (150х150 \\ 200х200)",
        imageSrc: assetPath("/images/products/ogolovok-108.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 200 руб.",
        category: ["caps"],
    },
    {
        id: 105,
        title: "Оголовок под сваю ф133 (200х200)",
        imageSrc: assetPath("/images/products/ogolovok-133.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 200 руб.",
        category: ["caps"],
    },
    {
        id: 106,
        title: "Оголовок под сваю ф159 (250х250)",
        imageSrc: assetPath("/images/products/ogolovok-159.png"),
        badge: "АКЦИЯ",
        thickness: "Толщина: 4мм или другие",
        price: "от 300 руб.",
        category: ["caps"],
    },
];

import { vi, expect } from "vitest";
// JSDOM/Testing Library setup hooks can be added here if needed
// e.g., global fetch polyfills or mocking window APIs

// Ensure Intl/URL APIs exist in JSDOM if needed
expect.extend({});

// Mock window object
Object.defineProperty(window, "axios", {
    value: {
        defaults: {
            headers: {
                common: {},
            },
        },
        interceptors: {
            response: {
                use: vi.fn(),
            },
        },
    },
    writable: true,
});

// Mock console methods to reduce noise in tests
global.console = {
    ...console,
    error: vi.fn(),
    warn: vi.fn(),
    log: vi.fn(),
};

// Mock setTimeout and clearTimeout for notification tests
vi.stubGlobal(
    "setTimeout",
    vi.fn((fn, delay) => {
        if (delay === 0) {
            fn();
        }
        return 1;
    }),
);

vi.stubGlobal("clearTimeout", vi.fn());

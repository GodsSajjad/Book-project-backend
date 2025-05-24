import rateLimiter from "express-rate-limit";

export const registerLimiter = rateLimiter({
    windowMs: 1000 * 60 * 3,
    max: 4,
    message: async (req, res) => {
        return { message: "بیش از اندازه تلاش کردید لطفا ۳ دقیقه صبر کنید" };
    },
    legacyHeaders: false,
    standardHeaders: true,
});
export const loginLimiter = rateLimiter({
    windowMs: 1000 * 60 * 3,
    max: 4,
    message: async (req, res) => {
        return { message: "بیش از اندازه تلاش کردید لطفا ۳ دقیقه صبر کنید" };
    },
    legacyHeaders: false,
    standardHeaders: true,
});
export const getTokenLimiter = rateLimiter({
    windowMs: 1000 * 60 * 5,
    max: 1,
    message: async (req, res) => {
        return { message: "بیش از اندازه تلاش کردید لطفا ۳ دقیقه صبر کنید" };
    },
    legacyHeaders: false,
    standardHeaders: true,
});
export const BooksLimiter = rateLimiter({
    windowMs: 1000 * 60 * 3,
    max: 15,
    message: async (req, res) => {
        return { message: "بیش از اندازه تلاش کردید لطفا ۳ دقیقه صبر کنید" };
    },
    legacyHeaders: false,
    standardHeaders: true,
});
export const editUsernameLimiter = rateLimiter({
    windowMs: 1000 * 60 * 10,
    max: 5,
    message: async (req, res) => {
        return { message: "بیش از اندازه تلاش کردید لطفا ۳ دقیقه صبر کنید" };
    },
    legacyHeaders: false,
    standardHeaders: true,
});
export const editPasswordLimiter = rateLimiter({
    windowMs: 1000 * 60 * 15,
    max: 5,
    message: async (req, res) => {
        return { message: "بیش از اندازه تلاش کردید لطفا ۳ دقیقه صبر کنید" };
    },
    legacyHeaders: false,
    standardHeaders: true,
});

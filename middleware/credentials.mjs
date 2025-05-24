import { allowedOrigin } from "../Origins/allowedOrigin.mjs";
export const credential = (req, res, next) => {
    const origin = req.origin;
    if (allowedOrigin.includes(origin)) {
        res.setHeader("Access-Controll-Allow-credentials", true);
    }
    next();
};

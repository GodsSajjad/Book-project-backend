import jwt from "jsonwebtoken";
import AppError from "../utails/AppError.mjs";
import "dotenv/config";
import { getUserByUsername } from "../models/db_User.mjs";

export const vrify_Access_Token = (req, res, next) => {
    const auth = req.headers.authorization || req.headers.Authorization;
    if (!auth) return next(new AppError("Access Token not found", 401));
    if (!auth?.startsWith("Bearer "))
        return next(new AppError("format of the token is invalid", 400));
    const accessToken = auth.split(" ")[1];
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY, async (e, decode) => {
        if (e) {
            return next(new AppError("token is expired or not valid", 401));
        }
        const user = await getUserByUsername(decode.username);
        if (!user) return next(new AppError("information is invalid", 403));
        req.user = { username: decode.username, isAdmin: user.dataValues.isAdmin };
        next();
    });
};

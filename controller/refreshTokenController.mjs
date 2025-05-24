import { getUserByRefreshtoken, getUserByUsername } from "../models/db_User.mjs";
import jwt from "jsonwebtoken";
import AppError from "../utails/AppError.mjs";
import catchfn from "../utails/catchError.mjs";
import "dotenv/config";
import {
    clearCoockie,
    creatRefrshToken,
    creatAccessToken,
    sendCoockie,
} from "../smallFunction.mjs";

export const refreshTokenController = catchfn(async (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies.jwt) return next(new AppError("refresh token undefined", 400));
    const refreshToken = cookies.jwt;
    clearCoockie(res);
    const fulluser = await getUserByRefreshtoken(refreshToken);
    if (!fulluser) {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (e, decode) => {
            if (e) return;
            const HackerUser = await getUserByUsername(decode.username);
            HackerUser.refreshToken = null;
            await HackerUser.save();
        });
        return next(new AppError("the information dose not match the token", 403));
    }
    const user = fulluser.dataValues;
    const accessToken = creatAccessToken(user.username);
    const newRefreshToken = creatRefrshToken(user.username);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, async (e, decode) => {
        if (e) return next(new AppError("token is expired or not valid", 401));
        fulluser.accessToken = accessToken;
        fulluser.refreshToken = newRefreshToken;
        await fulluser.save();
        sendCoockie(res, newRefreshToken);
        res.status(201).json({ accessToken });
    });
});

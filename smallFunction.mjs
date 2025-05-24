import jwt from "jsonwebtoken";
import AppError from "./utails/AppError.mjs";
import "dotenv/config";
import { getUserByUsername } from "./models/db_User.mjs";
export const getUserAndPassByReq = (req) => {
    const body = req.body;

    const username = body.username ? body.username : false;
    const password = body.password ? body.password : false;

    return { username, password };
};
export const userSchemaValidateor = (error) => {
    const type = error.details[0].type;
    if (type === "string.min") return new AppError("in username minimum char is 3", 400);
    if (type === "string.max") return new AppError("in username maximum Char is 30", 400);
    if (type === "string.pattern.name")
        return new AppError("please only number and A...z and _ and . in string", 400);
};
export const passSchemaValidateor = (error) => {
    const type = error.details[0].type;
    if (type === "string.min") return new AppError("in password minimum char is 8", 400);
    if (type === "string.max") return new AppError("in password maximum Char is 35", 400);
    if (type === "string.pattern.base")
        return new AppError(
            "in password please enter one upperCase , one loweCase , one number and one spical character to safe password",
            400
        );
};
export const creatAccessToken = (username) => {
    return jwt.sign({ username }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "360s",
    });
};
export const creatRefrshToken = (username) => {
    return jwt.sign({ username }, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "5d",
    });
};
export const sendCoockie = (res, refreshToken) => {
    res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 1000 * 60 * 60 * 24 * 5,
    });
};
export const clearCoockie = (res) => {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
};
export const isAdminAndIsExists = async (username) => {
    const user = await getUserByUsername(username);
    if (!user) return new AppError("username not found", 404);
    if (!user.dataValues.isAdmin) return new AppError(`${username} is not admin`, 400);
};

import {
    addNewUser,
    editPasswordById,
    findAdmin,
    getUserByUsername,
    editUsernameById,
    getUserById,
    editUsernameByUsername,
    editPasswordByUsername,
} from "../models/db_User.mjs";
import "dotenv/config";
import catchfn from "../utails/catchError.mjs";
import joi from "joi";
import { comparePassword, hashPssword } from "../models/helper.mjs";
import AppError from "../utails/AppError.mjs";
import jwt from "jsonwebtoken";
import { passwordValidator, usernameSchema } from "../SchemaValidators/Validators.mjs";
import {
    clearCoockie,
    creatAccessToken,
    creatRefrshToken,
    getUserAndPassByReq,
    passSchemaValidateor,
    sendCoockie,
    userSchemaValidateor,
} from "../smallFunction.mjs";
export default class authController {
    static registerController = catchfn(async (req, res, next) => {
        const { username, password } = getUserAndPassByReq(req);
        if (!username || !password)
            return next(new AppError("username or password not existed"), 400);
        const validateUsername = usernameSchema.validate(username);
        const validatePassword = passwordValidator.validate(password);
        if (validateUsername.error) {
            return next(userSchemaValidateor(validateUsername.error));
        }
        if (validatePassword.error) {
            return next(passSchemaValidateor(validatePassword.error));
        }
        if (await getUserByUsername(username)) return next(new AppError("username is used", 400));
        const hashPassword = await hashPssword(password);
        const accessToken = creatAccessToken(username);
        const refreshToken = creatRefrshToken(username);

        const ip = req.ip || null;

        if (!ip) return next(new AppError("please check your internt or off vpn", 403));
        await addNewUser(username, hashPassword, accessToken, refreshToken, ip);
        sendCoockie(res, refreshToken);
        res.status(201).json({ msg: "user created", body: { accessToken, username }, res: true });
    });

    static logoutController = catchfn(async (req, res, next) => {
        const refreshtoken = req.cookies.jwt;
        clearCoockie(res);

        if (!refreshtoken) return next(new AppError("you not logined", 401));
        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_KEY, async (e, decode) => {
            if (e) return next(new AppError("you not logined", 401));
            const user = await getUserByUsername(decode.username);
            user.refreshToken = null;
            user.accessToken = null;
            await user.save();
            res.status(201).json({ msg: "logout seccessfull", body: null, res: true });
        });
    });

    static loginController = catchfn(async (req, res, next) => {
        const { username, password } = getUserAndPassByReq(req);
        if (!username || !password)
            return next(new AppError("username or password not existed"), 400);
        const fulluser = await getUserByUsername(username);

        if (!fulluser) return next(new AppError("username not found", 404));
        const user = fulluser.dataValues;
        if (!req.ip) return next(new AppError("please check your internt or off vpn", 403));
        const ip = req.ip || null;

        if (ip !== user.ip) {
            clearCoockie(res);
            return next(new AppError("ipAddres is invalid. please login again", 403));
        }
        if (!(await comparePassword(password, user.password)))
            return next(new AppError("password invalid", 400));
        const cookies = req.cookies;
        if (cookies.jwt) {
            clearCoockie(res);
        }
        const accessToken = creatAccessToken(username);
        const refreshToken = creatRefrshToken(username);
        fulluser.accessToken = accessToken;
        fulluser.refreshToken = refreshToken;
        await fulluser.save();
        sendCoockie(res, refreshToken);
        res.status(200).json({ msg: "login seccess", body: { accessToken, username }, res: true });
    });
    static editUsername = catchfn(async (req, res, next) => {
        const { body } = req;
        const { username } = getUserAndPassByReq(req);
        const validateUsername = usernameSchema.validate(username);
        if (validateUsername.error) {
            return next(userSchemaValidateor(validateUsername.error));
        }
        if (await getUserByUsername(username))
            return next(new AppError("username is already in use", 400));

        await editUsernameByUsername(req.user.username, username);
        const newAccessToken = creatAccessToken(username);

        res.status(201).send({ msg: "username chenged", body: { newAccessToken }, res: true });
    });
    static editPassword = catchfn(async (req, res, next) => {
        const { body } = req;
        const validatePassword = passwordValidator.validate(body.password);
        if (validatePassword.error) {
            return next(passSchemaValidateor(validatePassword.error));
        }
        const fullUser = await getUserByUsername(req.user.username);
        const user = fullUser.dataValues;
        if (!(await comparePassword(body.brofe_password, user.password)))
            return next(new AppError("brofe password is inccred", 403));

        await editPasswordByUsername(req.user.username, await hashPssword(body.password));
        res.status(201).send({ msg: "password chenged", body: null, res: true });
    });
}

import express from "express";
import { vrify_Access_Token } from "../middleware/Veryfy_Access_Token.mjs";
import authController from "../controller/authcontroller.mjs";
import {
    editPasswordLimiter,
    editUsernameLimiter,
    getTokenLimiter,
    loginLimiter,
    registerLimiter,
} from "../middleware/rateLimit.mjs";
import { refreshTokenController } from "../controller/refreshTokenController.mjs";
const app = express.Router();

app.post("/auth/register", registerLimiter, authController.registerController);
app.post("/auth/logout", authController.logoutController);
app.post("/auth/login", loginLimiter, authController.loginController);
app.get("/auth/getaccesstoken", getTokenLimiter, refreshTokenController);
app.put("/auth/chenge", editUsernameLimiter, vrify_Access_Token, authController.editUsername);
app.put(
    "/auth/chenge-pass",

    editPasswordLimiter,
    vrify_Access_Token,
    authController.editPassword
);
export default app;

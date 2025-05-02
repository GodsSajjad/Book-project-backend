import express from "express";
import authController from "../controller/authcontroller.mjs";
import passport from "passport";
import "./Strategy.mjs";
const app = express.Router();

app.post("/auth/register", authController.registerController);
app.post("/auth/logout", authController.logoutController);
app.post("/auth/login", passport.authenticate("local"), authController.loginController);
app.put("/auth/chenge", authController.authChecker, authController.editUsename);
app.put("/auth/chenge-pass", authController.authChecker, authController.editPassword);
export default app;

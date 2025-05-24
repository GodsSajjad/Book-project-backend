import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
process.on("uncaughtException", (e) => {
    console.log("normal error ....");
    console.log(e.name, e.message);
});
import AppError from "./utails/AppError.mjs";
import "dotenv/config";

import ErrorHandller from "./controller/ErrorController.mjs";
import authRouter from "./router/authrouter.mjs";
import bookrouter from "./router/bookRouter.mjs";

import { corsOptaion } from "./corsOptaions.mjs";
import { credential } from "./middleware/credentials.mjs";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());

app.use(credential);
app.use(cors(corsOptaion));
app.use(authRouter);
app.use(bookrouter);

app.use("/", (req, res, next) => {
    console.log(req.headers.origin);
    next(new AppError("page not found", 404));
});
app.use(ErrorHandller);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("run...");
});
process.on("unhandledRejection", (e) => {
    console.log("catch error ...");
    console.log(e.name, e.message);
    server.close(() => {
        process.exit(1);
    });
});

import express from "express";
import passport from "passport";
import authRouter from "./router/authrouter.mjs";
import session from "express-session";
import mysqlexpress from "express-mysql-session";
import bookrouter from "./router/bookRouter.mjs";
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(
    session({
        secret: "Sajjad9059",
        saveUninitialized: false,
        resave: false,

        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(bookrouter);
app.use((req, res) => {
    res.send("hi");
});

app.listen(3000, () => {
    console.log("run...");
});

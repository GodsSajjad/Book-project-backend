import passport from "passport";
import { Strategy } from "passport-local";
import { getUserById, getUserByUsername } from "../models/db_User.mjs";
import { comparePassword, hashPssword } from "../models/helper.mjs";
import catchfn from "../utails/catchError.mjs";
import AppError from "../utails/AppError.mjs";
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(
    catchfn(async (id, done) => {
        const user = await getUserById(id);
        if (!user) return done(new AppError("user not found", 404));
        else return done(null, user);
    })
);

passport.use(
    new Strategy(
        catchfn(async (username, password, done) => {
            const user = await getUserByUsername(username);

            if (!user) return done(new AppError("user not found", 404));
            else if (!(await comparePassword(password, user.password))) {
                return done(new AppError("password invalid", 403));
            } else {
                done(null, user);
            }
        })
    )
);

import passport from "passport";
import { Strategy } from "passport-local";
import { getUserById, getUserByUsername } from "../models/db_User.mjs";
import { comparePassword, hashPssword } from "../models/helper.mjs";
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await getUserById(id);
        if (!user) return done("user not found", null);
        else return done(null, user);
    } catch (e) {
        return done(e, null);
    }
});

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const user = await getUserByUsername(username);

            if (!user) done("user not found", null);
            else if (!(await comparePassword(password, user.password))) {
                done("password invalid", null);
            } else {
                done(null, user);
            }
        } catch (e) {
            console.log(e.message);
        }
    })
);

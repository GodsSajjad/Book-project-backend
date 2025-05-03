import {
    addNewUser,
    editPasswordById,
    findAdmin,
    getUserByUsername,
    editUsernameById,
    getUserById,
} from "../models/db_User.mjs";
import { comparePassword, hashPssword } from "../models/helper.mjs";

export default class authController {
    static async authChecker(req, res, next) {
        if (req.isAuthenticated()) return next();

        res.status(401).send({ msg: "request invalid", body: null, res: false });
    }
    static async registerController(req, res) {
        try {
            const { body } = req;

            res.type("json");
            if (await getUserByUsername(body.username))
                res.status(401).send({ msg: "user found", body: null, res: false });
            else {
                const Password = await hashPssword(body.password);
                await addNewUser(body.username, Password);

                req.session.user = await getUserByUsername(body.username);
                res.status(201).redirect("/home");
            }
        } catch (e) {
            res.status(501).send({ msg: "server error", body: null, res: false });
            console.log(e.message);
        }
    }

    static logoutController(req, res) {
        res.logout((e) => {
            if (e) {
                res.status(400).send({ msg: "not logined", body: null, res: false });
            } else {
                res.status(200).send({ msg: "logouted", body: null, res: true });
            }
        });
    }
    static loginController(req, res) {
        if (req.user) {
            res.send("wolcome");
        } else {
            res.send("not loggid");
        }
    }
    static async editUsename(req, res) {
        try {
            const { body } = req;
            if (req.isAuthenticated()) {
                if (await getUserByUsername(body.username))
                    res.status(400).send({
                        msg: "username is already in use",
                        body: null,
                        res: false,
                    });
                else {
                    await editUsernameById(req.user.id, body.username);
                    res.status(201).send({ msg: "username chenged", body: null, res: true });
                }
            } else {
                res.status(401).send({ msg: "request invalid", body: null, res: false });
            }
        } catch (e) {
            res.status(501).send({ msg: "server error", body: null, res: false });
            console.log(e.message);
        }
    }
    static async editPassword(req, res) {
        try {
            const { body } = req;
            if (req.isAuthenticated()) {
                if (await comparePassword(body.brofe_password, req.user.password)) {
                    await editPasswordById(req.user.id, await hashPssword(body.password));
                    res.status(201).send({ msg: "password chenged", body: null, res: true });
                } else {
                    res.status(401).send({
                        msg: "brofe password is inccared",
                        body: null,
                        res: false,
                    });
                }
            } else {
                res.status(401).send({ msg: "request invalid", body: null, res: false });
            }
        } catch (e) {
            res.status(501).send({ msg: "server error", body: null, res: false });
            console.log(e.message);
        }
    }
}

import { Users } from "./con.mjs";
export async function findAdmin(username) {
    try {
        const Data = await Users.findOne({
            where: {
                username,
            },
            raw: false,
        });
        if (Data) {
            const user = Data.dataValues;
            if (user.isAdmin) {
                return true;
            }
            return false;
        }
        return false;
    } catch (e) {
        return false;
    }
}

export async function addNewUser(username, password, accessToken, refreshToken, ip) {
    try {
        await Users.create({
            username: username.toLowerCase(),
            password,
            accessToken,
            refreshToken,
            ip,
        });
        return true;
    } catch (e) {
        return false;
    }
}
export async function editUsernameById(id, username) {
    try {
        await Users.update(
            { username: username.toLowerCase() },
            {
                where: {
                    id,
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}
export async function editUsernameByUsername(brofe, newusername) {
    try {
        await Users.update(
            { username: newusername.toLowerCase() },
            {
                where: {
                    username: brofe,
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}
export async function editPasswordById(id, password) {
    try {
        await Users.update(
            { password },
            {
                where: {
                    id,
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}
export async function editPasswordByUsername(brofe, newpassword) {
    try {
        await Users.update(
            { password: newpassword },
            {
                where: {
                    username: brofe,
                },
            }
        );
        return true;
    } catch (e) {
        return false;
    }
}

export async function getUserByUsername(username) {
    try {
        const Data = await Users.findOne({
            attributes: [
                "id",
                "username",
                "password",
                "isAdmin",
                "refreshToken",
                "accessToken",
                "ip",
            ],
            where: {
                username: username.toLowerCase(),
            },
        });

        return Data;
    } catch (e) {
        return false;
    }
}
export async function getUserByRefreshtoken(refreshToken) {
    try {
        const Data = await Users.findOne({
            attributes: [
                "id",
                "username",
                "password",
                "isAdmin",
                "refreshToken",
                "accessToken",
                "ip",
            ],
            where: {
                refreshToken,
            },
        });

        return Data;
    } catch (e) {
        return false;
    }
}
export async function getUserById(id) {
    try {
        const Data = await Users.findOne({
            attributes: [
                "id",
                "username",
                "password",
                "isAdmin",
                "refreshToken",
                "accessToken",
                "ip",
            ],
            where: {
                id: Number(id),
            },
        });
        return Data;
    } catch (e) {
        return false;
    }
}

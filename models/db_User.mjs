import { Users } from "./con.mjs";

export async function findAdmin(username) {
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
}

export async function addNewUser(username, password) {
    try {
        await Users.create({
            username,
            password,
        });
        return true;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function editUsernameById(id, username) {
    try {
        await Users.update(
            { username },
            {
                where: {
                    id,
                },
            }
        );
        return true;
    } catch (e) {
        console.log(e.message);
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
        console.log(e.message);
        return false;
    }
}

export async function getUserByUsername(idOrUsername) {
    try {
        if (typeof idOrUsername === "string") {
            const Data = await Users.findOne({
                attributes: ["id", "username", "password", "isAdmin"],
                where: {
                    username: idOrUsername,
                },
                raw: true,
            });

            return Data;
        }
    } catch (e) {
        console.log(e.message);
    }
}
export async function getUserById(id) {
    try {
        const Data = await Users.findOne({
            attributes: ["id", "username", "password", "isAdmin"],
            where: {
                id: Number(id),
            },
            raw: true,
        });
        return Data;
    } catch (e) {
        return e.message;
    }
}

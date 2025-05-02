import { Bookdb, Users } from "./con.mjs";
export async function getAllBook() {
    try {
        const Data = await Bookdb.findAll({
            attributes: ["id", "title", "author", "publisher", "data"],
            raw: true,
        });
        return Data;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function getBook(idOrTitle) {
    try {
        if (typeof idOrTitle == "string") {
            const Data = await Bookdb.findOne({
                attributes: ["id", "title", "author", "publisher", "data"],
                where: {
                    title: idOrTitle,
                },
                raw: true,
            });
            return Data;
        }
        const Data = await Bookdb.findOne({
            attributes: ["id", "title", "author", "publisher", "data"],
            where: {
                id: idOrTitle,
            },
            raw: true,
        });
        return Data;
    } catch (e) {
        console.log(e.message);
    }
}
export async function getMyBook(username) {
    try {
        const Data = await Bookdb.findAll({
            attributes: ["id", "title", "author", "publisher", "data"],
            where: {
                publisher: username,
            },
            raw: true,
        });
        return Data;
    } catch (e) {
        console.log(e.message);
    }
}
export async function createBook(title, author, publisher, data) {
    try {
        if (!(await getBook(title))) {
            await Bookdb.create({
                title,
                author,
                publisher,
                data,
            });
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function editById(title, data) {
    try {
        await Bookdb.update(
            { data },
            {
                where: {
                    title,
                },
            }
        );
        return true;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}

export async function removeBookById(id) {
    try {
        await Bookdb.destroy({
            where: {
                id,
            },
        });
        return true;
    } catch (e) {
        console.log(e.message);
        return false;
    }
}
export async function findAdmin(username) {
    const Data = await Users.findOne({
        where: {
            username,
        },
        raw: false,
    });
    if (Data) {
        const Book = Data.dataValues;
        if (Book.isAdmin) {
            return true;
        }
        return false;
    }
    return false;
}

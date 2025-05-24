import { Bookdb, Users } from "./con.mjs";
export async function getAllBook() {
    try {
        const Data = await Bookdb.findAll({
            attributes: ["title", "author", "publisher", "data", "book_id"],
            raw: true,
        });
        return Data;
    } catch (e) {
        return false;
    }
}
export async function getBook(idOrTitle) {
    try {
        if (typeof idOrTitle == "string") {
            const Data = await Bookdb.findOne({
                attributes: ["id", "title", "author", "publisher", "data", "book_id"],
                where: {
                    title: idOrTitle,
                },
                raw: true,
            });
            return Data;
        }
        const Data = await Bookdb.findOne({
            attributes: ["id", "title", "author", "publisher", "data", "book_id"],
            where: {
                id: idOrTitle,
            },
            raw: true,
        });
        return Data;
    } catch (e) {
        return false;
    }
}
export async function getBookByIdAndPublisher(id, publisher) {
    try {
        const Data = await Bookdb.findOne({
            attributes: ["title", "author", "publisher", "data", "book_id"],
            where: {
                id,
                publisher,
            },
            raw: true,
        });
        return Data;
    } catch (e) {
        return false;
    }
}
export async function getBookByPublisher(publisher) {
    try {
        const Data = await Bookdb.findAll({
            attributes: ["title", "author", "publisher", "data", "book_id"],
            where: {
                publisher,
            },
            raw: true,
        });
        return Data;
    } catch (e) {
        return false;
    }
}
export async function getMyBook(username) {
    try {
        const Data = await Bookdb.findAll({
            attributes: ["id", "title", "author", "publisher", "data", "book_id"],
            where: {
                publisher: username,
            },
            raw: true,
        });

        return Data;
    } catch (e) {
        return false;
    }
}
export async function createBook(title, author, publisher, data) {
    try {
        const books = await getMyBook(publisher);
        let book_id = 1;
        if (books.length !== 0) {
            const id = books[books.length - 1].book_id;
            book_id = id + 1;
        }
        if (!(await getBook(title))) {
            await Bookdb.create({
                title,
                author,
                publisher,
                data,
                book_id,
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

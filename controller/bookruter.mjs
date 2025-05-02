import Book from "../models/Book.mjs";
export default class bookcontroller {
    static async addNewBook(req, res) {
        try {
            const { body } = req;
            if (req.user && req.user.isAdmin) {
                if (!(await Book.getBook(body.title))) {
                    const book = new Book(body.title, body.author, req.user.username, body.data);
                    if (book.save()) {
                        res.status(201).send({
                            msg: "book created",
                            body: { title: body.title },
                            res: true,
                        });
                    }
                } else {
                    res.status(401).send({ msg: "title allrdy be use", body: null, res: false });
                }
            } else {
                res.status(401).send({ msg: "request invalid", body: null, res: false });
            }
        } catch (e) {
            console.log(e.message);
            res.status(501).send({ msg: "server error", body: null, res: false });
        }
    }
    static async editBook(req, res) {
        try {
            const { body } = req;

            if (req.user && req.user.isAdmin) {
                const brofe_book = await Book.getBook(body.title);
                if (brofe_book.data === body.data)
                    res.status(400).send({ msg: "data it use", body: null, res: false });
                else {
                    if (await Book.editById(body.title, body.data)) {
                        res.status(201).send({ msg: "book updated", body: null, res: true });
                    }
                }
            } else {
                res.status(401).send({ msg: "request invalid", body: null, res: false });
            }
        } catch (e) {
            console.log(e.message);
            res.status(501).send({ msg: "server error", body: null, res: false });
        }
    }
    static async removeBook(req, res) {
        try {
            const { body } = req;

            if (req.user && req.user.isAdmin) {
                if (Book.removeBookById(body.id)) {
                    res.status(201).send({ msg: "book removed", body: null, res: true });
                } else {
                    res.status(404).send({ msg: "request invalid", body: null, res: false });
                }
            } else {
                res.status(401).send({ msg: "book not found", body: null, res: false });
            }
        } catch (e) {
            console.log(e.message);
            res.status(501).send({ msg: "server error", body: null, res: false });
        }
    }
    static async getAllBook(req, res) {
        try {
            const data = await Book.getAllBook();
            res.status(200).send({ msg: "all book sended", body: { data }, res: true });
        } catch (e) {
            res.status(501).send({ msg: "server error", body: null, res: false });
            console.log(e.message);
        }
    }
    static async getBook(req, res) {
        try {
            const book = await Book.getBook(Number(req.params.id));
            const data = book ? book : [];
            res.status(200).send({ msg: "all book sended", body: { data }, res: true });
        } catch (e) {
            res.status(501).send({ msg: "server error", body: null, res: false });
            console.log(e.message);
        }
    }
    static async getMyBook(req, res) {
        try {
            const data = await Book.getMyBook(req.user.username);
            res.status(200).send({ msg: "all book sended", body: { data }, res: true });
        } catch (e) {
            res.status(501).send({ msg: "server error", body: null, res: false });
            console.log(e.message);
        }
    }
}

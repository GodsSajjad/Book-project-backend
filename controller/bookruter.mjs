import Book from "../models/Book.mjs";
import { getUserByUsername } from "../models/db_User.mjs";
import { isAdminAndIsExists } from "../smallFunction.mjs";
import AppError from "../utails/AppError.mjs";
import catchfn from "../utails/catchError.mjs";
export default class bookcontroller {
    static addNewBook = catchfn(async (req, res, next) => {
        const { body } = req;
        if (!body.title || !body.author || !req.user.username || !body.data)
            return next(new AppError("please sent full information in body", 400));
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
            return next(new AppError("title allrdy be use", 400));
        }
    });

    static editBook = catchfn(async (req, res, next) => {
        const { body } = req;

        if (!body.title || !body.data)
            return next(new AppError("please sent full information in body", 400));
        if (!(await Book.getBook(body.title))) return next(new AppError("Book Not Found", 404));
        const brofe_book = await Book.getBook(body.title);
        if (brofe_book.data === body.data) return next(new AppError("data is use", 400));
        else {
            if (await Book.editById(body.title, body.data)) {
                res.status(201).send({
                    msg: "book updated",
                    body: {
                        title: brofe_book.title,
                        author: brofe_book.author,
                        publisher: brofe_book.publisher,
                    },
                    res: true,
                });
            }
        }
    });
    static removeBook = catchfn(async (req, res, next) => {
        const { body } = req;

        if (!body.id) return next(new AppError("please sent id for remove", 400));
        if (!(await Book.getBook(Number(body.id))))
            return next(new AppError("Book Not Found", 404));
        const book = await Book.getBook(body.id);
        if (await Book.removeBookById(body.id))
            return res.status(201).send({
                msg: "book removed",
                body: {
                    title: book.title,
                    author: book.author,
                    publisher: book.publisher,
                },
                res: true,
            });

        return next(new AppError("request invalid", 403));
    });

    static getAllBook = catchfn(async (req, res, next) => {
        const data = await Book.getAllBook();
        if (data.length === 0) return next(new AppError("there are no book", 404));
        res.status(200).send({ msg: "all book sended", body: data, res: true });
    });
    static getBookID = catchfn(async (req, res, next) => {
        const error = await isAdminAndIsExists(req.params.publisher);
        if (error) {
            return next(error);
        }
        const book = await Book.getBookByIdAndPublisher(
            Number(req.params.id),
            req.params.publisher
        );
        if (!book) return next(new AppError("book not exsist", 404));
        res.status(200).send({
            msg: "book sended",
            body: book,
            res: true,
        });
    });
    static getBookPUb = catchfn(async (req, res, next) => {
        const error = await isAdminAndIsExists(req.params.publisher);
        if (error) {
            return next(error);
        }
        const book = await Book.getBookByPublisher(req.params.publisher);
        if (book.length === 0) return next(new AppError("user not book", 404));
        res.status(200).send({
            msg: "book sended",
            body: book,
            res: true,
        });
    });
    static getMyBook = catchfn(async (req, res, next) => {
        const data = await Book.getMyBook(req.user.username);
        if (data.length === 0) return next(new AppError("you dont have a book", 404));
        res.status(200).send({ msg: "all book sended", body: data, res: true });
    });
}

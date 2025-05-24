import express from "express";
import bookcontroller from "../controller/bookruter.mjs";
import { vrify_Access_Token } from "../middleware/Veryfy_Access_Token.mjs";
import { isAdmin_verifyer } from "../middleware/verify_isAdmin.mjs";
import { BooksLimiter } from "../middleware/rateLimit.mjs";
const app = express.Router();
app.get("/get-all", BooksLimiter, bookcontroller.getAllBook);
app.get("/book/:publisher/:id", BooksLimiter, bookcontroller.getBookID);
app.get("/book/:publisher", BooksLimiter, bookcontroller.getBookPUb);
app.post(
    "/add-book",
    BooksLimiter,
    vrify_Access_Token,
    isAdmin_verifyer,
    bookcontroller.addNewBook
);
app.put("/edit-book", BooksLimiter, vrify_Access_Token, isAdmin_verifyer, bookcontroller.editBook);
app.delete(
    "/remove-book",
    BooksLimiter,
    vrify_Access_Token,
    isAdmin_verifyer,
    bookcontroller.removeBook
);
app.get("/my-book", BooksLimiter, vrify_Access_Token, isAdmin_verifyer, bookcontroller.getMyBook);
export default app;

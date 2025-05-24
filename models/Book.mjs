import {
    createBook,
    editById,
    getAllBook,
    getBook,
    removeBookById,
    getMyBook,
    getBookByIdAndPublisher,
    getBookByPublisher,
} from "./db_book.mjs";
import { findAdmin } from "./db_User.mjs";
export default class Book {
    #title;
    #author;
    #publisher;
    #data;
    constructor(title, author, publisher, data) {
        this.#title = title;
        this.#author = author;
        this.#publisher = publisher;
        this.#data = data;
    }
    async save() {
        if ((await getBook(this.#title)) && !(await findAdmin(this.#publisher))) return false;
        createBook(this.#title, this.#author, this.#publisher, this.#data);
        return true;
    }
    static async getAllBook() {
        return await getAllBook();
    }
    static async getMyBook(username) {
        return await getMyBook(username);
    }
    static async getBook(idOrTitle) {
        if (await getBook(idOrTitle)) {
            return await getBook(idOrTitle);
        }
        return false;
    }
    static async getBookByIdAndPublisher(id, publisher) {
        if (id) {
            return await getBookByIdAndPublisher(id, publisher);
        }

        return false;
    }
    static async getBookByPublisher(publisher) {
        if (await getBookByPublisher(publisher)) {
            return await getBookByPublisher(publisher);
        }

        return false;
    }
    static async editById(title, data) {
        if (await getBook(title)) {
            await editById(title, data);
            return true;
        }
        return false;
    }
    static async removeBookById(id) {
        if (await getBook(id)) {
            await removeBookById(id);
            return true;
        }
        return false;
    }
}

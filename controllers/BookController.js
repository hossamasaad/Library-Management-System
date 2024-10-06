import bookService from "../services/bookService.js";

async function getBookById(req, res, next) {
    try {
        const book = await bookService.getBookById(req.params.id);
        res.status(200).json(book);
    }
    catch (err) {
        next(err)
    }
}

async function addBook(req, res, next) {
    try {
        const { title, author, ISBN, quantity, shelfLocation } = req.body;
        const book = await bookService.addBook({ title, author, ISBN, quantity, shelfLocation });
        res.status(201).json(book);
    }
    catch (err) {
        next(err)
    }
}

async function updateBook(req, res, next) {
    try {
        const { title, author, ISBN, quantity, shelfLocation } = req.body;
        const updatedBook = await bookService.updateBook(req.params.id, { title, author, ISBN, quantity, shelfLocation });
        res.status(200).json(updatedBook);
    }
    catch (err) {
        next(err)
    }
}

async function deleteBook(req, res, next) {
    try {
        const deletedBook = await bookService.deleteBook(req.params.id);
        res.status(200).json(deletedBook);
    }
    catch (err) {
        next(err)
    }
}

async function getAllBooks(req, res, next) {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    }
    catch(err) {
        next(err);
    }
}

async function searchBooks(req, res, next) {
    try {
        const books = await bookService.searchBooks(req.params.text);
        res.status(200).json(books);
    }
    catch(err) {
        next(err);
    }
}


export default { getBookById, addBook, updateBook, deleteBook, getAllBooks, searchBooks };
import borrowBookService from "../services/borrowBookService.js";


async function checkoutBook(req, res, next) {
    try {
        const { borrowerId, bookId, dueDate } = req.body;
        const checkedOutBook = await  borrowBookService.checkoutBook(borrowerId, bookId, dueDate);
        res.status(200).json(checkedOutBook);
    }
    catch (err) {
        next(err);
    }
}


async function returnBook(req, res, next) {
    try {
        const { borrowerId, bookId } = req.body;
        const returnedBook = await borrowBookService.returnBook(borrowerId, bookId);
        res.status(200).json(returnedBook);
    }
    catch (err) {
        next(err);
    }
}

async function getAllBorrowerBooks(req, res, next) {
    try {
        const borrowedBooks = await borrowBookService.getAllBorrowerBooks(req.params.id);
        res.status(200).json(borrowedBooks);
    }
    catch (err) {
        next(err);
    }
}

async function getAllOverdueBooks(req, res, next) {
    try {
        const overdueBooks = await borrowBookService.getAllOverdueBooks();
        res.status(200).json(overdueBooks);
    }
    catch (err) {
        next(err);
    }
}

export default { checkoutBook, returnBook, getAllBorrowerBooks, getAllOverdueBooks }
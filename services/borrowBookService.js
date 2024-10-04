import { Op } from "sequelize";
import NotFoundError from "../Error/NotFoundError.js";
import BorrowerBook from "../models/BorrowerBook.js";


async function checkoutBook(borrowerId, bookId, dueDate) {
    const returned = false;
    const details = await BorrowerBook.create({ borrowerId, bookId, dueDate, returned });
    return details;
}

async function returnBook(borrowerId, bookId) {
    const borrowerBook = await BorrowerBook.findOne({
        where: {
            BorrowerId: borrowerId,
            BookId: bookId
        }
    });
    if (!borrowerBook) {
        throw new NotFoundError("There is no borrowed books with this id " + id);
    }
    borrowerBook.returned = true;
    await borrowerBook.save();

    return borrowerBook;
}

async function getAllBorrowerBooks(borrowerId) {
    const borrowerBooks = await BorrowerBook.findAll({
        where: {borrowerId: borrowerId},
    });
    return borrowerBooks;
}


async function getAllOverdueBooks() {
    const overdueBooks = await BorrowerBook.findAll({
        where: {
            returned: false,
            dueDate: {
                [Op.lt]: new Date()
            }
        },
    });
    return overdueBooks; 
}


export default { checkoutBook, returnBook, getAllBorrowerBooks, getAllOverdueBooks }
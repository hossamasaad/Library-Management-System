import NotFoundError from "../Error/NotFoundError.js";
import BorrowerBook from "../models/BorrowerBook.js";


async function checkoutBook(borrowerId, bookId, dueDate) {
    const returned = false;
    const details = await BorrowerBook.add({ borrowerId, bookId, dueDate, returned });
    return details;
}

async function returnBook(borrowerId, bookId) {
    var borrowerBook = BorrowerBook.findByPk({borrowerId, bookId})
    if (!borrowerBook) {
        throw new NotFoundError("There is no borrowed books with this id " + id);
    }
    borrowerBook.returned = true;
    const details = await BorrowerBook.update(borrowerBook);
    return details;
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
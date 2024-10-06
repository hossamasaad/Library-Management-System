import { Op } from "sequelize";
import NotFoundError from "../Error/NotFoundError.js";
import BorrowerBook from "../models/BorrowerBook.js";
import Book from "../models/Book.js";
import { Parser } from "json2csv";


async function checkoutBook(borrowerId, bookId, dueDate) {
    const book = await Book.findOne({ where: { id: bookId } });
    
    if (!book) {
        throw new NotFoundError("Book not found with ID: " + bookId);
    }

    book.quantity -= 1;
    await book.save();
    
    const returned = false;
    const details = await BorrowerBook.create({ borrowerId, bookId, dueDate, returned });
    return details;
}

async function returnBook(borrowerId, bookId) {
    const book = await Book.findOne({ where: { id: bookId } });
    
    if (!book) {
        throw new NotFoundError("Book not found with ID: " + bookId);
    }

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
    book.quantity += 1;

    await borrowerBook.save();
    await book.save();

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

async function exportBorrowProcessesLastMonthToCSV() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const borrowProcesses = await BorrowerBook.findAll({
        where: {
            createdAt: {
                [Op.gte]: lastMonth
            }
        }
    });

    const fields = ['borrowerId', 'bookId', 'dueDate', 'returned', 'createdAt']; 
    const parser = new Parser({ fields });
    const csv = parser.parse(borrowProcesses);
    return csv;
}

async function exportOverdueBorrowProcessesLastMonthToCSV() {
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const overdueBorrowProcesses = await BorrowerBook.findAll({
        where: {
            returned: false,
            createdAt: {
                [Op.gte]: lastMonth
            },
            dueDate: {
                [Op.lt]: new Date()
            }
        }
    });

    const fields = ['borrowerId', 'bookId', 'dueDate', 'returned', 'createdAt']; 
    const parser = new Parser({ fields });
    const csv = parser.parse(overdueBorrowProcesses);
    return csv;
}

export default { checkoutBook, returnBook, getAllBorrowerBooks, getAllOverdueBooks, exportBorrowProcessesLastMonthToCSV, exportOverdueBorrowProcessesLastMonthToCSV }
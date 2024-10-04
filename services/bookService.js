import { Op } from "sequelize";
import NotFoundError from "../Error/NotFoundError.js";
import Book from "../models/Book.js";


async function getBookById(id) {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new NotFoundError("There is no books with this id " + id);
    }
    return book;
}

async function addBook(book) {
    return await Book.create(book);
}

async function updateBook(id, newBook) {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new NotFoundError("There is no books with this id " + id);
    }
    await book.update(newBook);
    return book;
}

async function deleteBook(id) {
    const book = await Book.findByPk(id);
    if (!book) {
        throw new NotFoundError("There is no books with this id " + id);
    }
    await book.destroy();
    return book;
}

async function getAllBooks() {
    return await Book.findAll();
}

async function searchBooks(query) {
    const books = await Book.findAll({
        where: {
            [Op.or]: [
                { title: { [Op.like]: `%${query}%` } },
                { author: { [Op.like]: `%${query}%` } },
                { ISBN: query }
            ]
        }
    });
  
    if (!books || books.length === 0) {
        throw new NotFoundError('No books found matching the search criteria');
    }
  
    return books;
}

export default { getBookById, addBook, updateBook, deleteBook, getAllBooks, searchBooks };
  
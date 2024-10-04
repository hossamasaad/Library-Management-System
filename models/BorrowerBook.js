import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import Borrower from './Borrower.js';
import Book from './Book.js';

const BorrowerBook = sequelize.define('BorrowerBook', {
    BorrowerId: {
        type: DataTypes.INTEGER,
        references: {
            model: Borrower,
            key: 'Id'
        }
    },
    BookId: {
        type: DataTypes.INTEGER,
        references: {
            model: Book,
            key: 'Id'
        }
    },
    dueDates: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['BorrowerId', 'BookId']
        }
    ]
});

export default BorrowerBook;

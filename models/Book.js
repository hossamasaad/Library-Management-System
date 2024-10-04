import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const Book = sequelize.define('Book', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    ISBN: {
        type: DataTypes.STRING(17),
        unique: true,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    shelfLocation: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    indexes: [
        {
            fields: ['title']
        },
        {
            fields: ['author']
        },
        {
            fields: ['ISBN']
        },
    ]
});

export default Book;
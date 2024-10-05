import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const Borrower = sequelize.define('Borrower', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(255),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    registerDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
});

export default Borrower;

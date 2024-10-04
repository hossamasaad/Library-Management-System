import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const User = sequelize.define('User', {
    Id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    UserType: {
        type: DataTypes.ENUM('Admin', 'SystemUser'),
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default User;

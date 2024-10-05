
import bcrypt from "bcryptjs/dist/bcrypt.js"
import User from "../models/User.js"
import LoginError from "../Error/LoginError.js"
import config from "../config/index.js";
import jwt from 'jsonwebtoken';

async function authenticateUser(username, password) {
    const user = await User.findOne(
        {
            where: { username }
        }
    )
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new LoginError("Invalid email or password");
    }
    const token = jwt.sign({ id: user.id, userType: user.userType }, config.app.jwt_secret, { expiresIn: '1h' })
    return { user, token }
}


async function addUser(username, password) {
    console.log(username, password);
    const userType = 'SystemUser';
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword, userType })
    return user;
}

export default { authenticateUser, addUser }
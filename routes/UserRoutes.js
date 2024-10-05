import { Router } from "express";
import { check } from "express-validator";
import UserController from "../controllers/UserController.js";
import jwt from "../middlewares/jwt.js";


const userRouter = Router();


await userRouter.post('/auth', [
    check('username').notEmpty().withMessage('Name is required'),
    check('password').notEmpty().withMessage('Password is required ')
], UserController.authenticateUser);


await userRouter.post('/add_user', [
    check('username').notEmpty().withMessage('Name is required'),
    check('password').isStrongPassword().withMessage('Password is not strong')
], 
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin']),
    UserController.addUser
);


export default userRouter;
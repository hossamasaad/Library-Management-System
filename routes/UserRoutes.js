import { Router } from "express";
import { check } from "express-validator";
import UserController from "../controllers/UserController.js";
import jwt from "../middlewares/jwt.js";
import validateInput from "../middlewares/validateInput.js";


const userRouter = Router();


await userRouter.post('/auth', [
    check('username').notEmpty().withMessage('Name is required'),
    check('password').notEmpty().withMessage('Password is required ')
], 
    validateInput,
    UserController.authenticateUser
);


await userRouter.post('/add_user', [
    check('username').notEmpty().withMessage('Name is required'),
    check('password').isStrongPassword().withMessage('Password is not strong')
], 
    jwt.authenticateJWT,
    jwt.authorizeUserTypes(['Admin']),
    validateInput,
    UserController.addUser
);


export default userRouter;
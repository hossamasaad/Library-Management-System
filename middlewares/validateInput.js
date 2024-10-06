import { validationResult } from "express-validator";
import { ValidationError } from "sequelize";


async function validateInput(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(new ValidationError(errors['errors'][0].msg));
    }
    next();
};


export default validateInput;
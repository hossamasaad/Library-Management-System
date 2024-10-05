import userService from "../services/userService.js";


async function authenticateUser(req, res, next) {
    try {
        const { username, password } = req.body;
        const { user, token } = await userService.authenticateUser(username, password);
        res.status(200).json({ user, token });
    }
    catch (err) {
        next(err);
    }
}


async function addUser(req, res, next) {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        console.log(username, password);

        const addedUser = await userService.addUser(username, password);
        res.status(201).json(addedUser);
    }
    catch (err) {
        next(err);
    }
}

export default { addUser, authenticateUser }
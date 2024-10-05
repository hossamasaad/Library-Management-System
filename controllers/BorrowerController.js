import borrowerService from "../services/borrowerService.js";


async function authenticateBorrower(req, res, next ) {
    try{
        const { email, password } = req.body;
        const { borrower, token } = await borrowerService.authenticateBorrower(email, password);
        res.status(200).json({ borrower, token });
    } catch (err) {
        next(err);
    }

}

async function registerBorrower(req, res, next) {
    try {
        const { name, email, password } = req.body;
        const registerDate = new Date().toISOString();
        const registeredBorrower = await borrowerService.registerBorrower(name, email, password, registerDate);
        res.status(201).json(registeredBorrower);
    }
    catch (err) {
        next(err);
    }
}

async function updateBorrower(req, res, next) {
    try {
        const { name, email } = req.body;
        const updatedBorrower = await borrowerService.updateBorrower(req.params.id, name, email);
        res.status(200).json(updatedBorrower);
    }
    catch (err) {
        next(err)
    }
}

async function deleteBorrower(req, res, next) {
    try {
        const deletedBorrower = await borrowerService.deleteBorrower(req.params.id);
        res.status(200).json(deletedBorrower);
    }
    catch (err) {
        next(err)
    }
}

async function getAllBorrowers(req, res, next) {
    try {
        const borrowers = await borrowerService.getAllBorrowers();
        res.status(200).json(borrowers);
    }
    catch(err) {
        next(err);
    }
}

export default { authenticateBorrower, registerBorrower, updateBorrower, deleteBorrower, getAllBorrowers }
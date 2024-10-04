import borrowerService from "../services/borrowerService.js";

async function updateBorrower(req, res, next) {
    try {
        const { name, email } = req.body;
        const registerDate = new Date().toISOString();
        const updatedBorrower = await borrowerService.updateBorrower(req.params.id, { name, email, registerDate });
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

export default { updateBorrower, deleteBorrower, getAllBorrowers }
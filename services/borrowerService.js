import NotFoundError from "../Error/NotFoundError.js";
import Borrower from "../models/Borrower.js";


async function updateBorrower(id, newBorrower) {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
        throw new NotFoundError("There is no borrowers with this id " + id);
    }
    await borrower.update(newBorrower);
    return borrower;
}

async function deleteBorrower(id) {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
        throw new NotFoundError("There is no borrowers with this id " + id);
    }
    await borrower.destroy();
    return borrower;
}

async function getAllBorrowers() {
    return await Borrower.findAll();
}


export default { updateBorrower, deleteBorrower, getAllBorrowers }
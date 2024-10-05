import config from "../config/index.js";
import LoginError from "../Error/LoginError.js";
import NotFoundError from "../Error/NotFoundError.js";
import Borrower from "../models/Borrower.js";


async function authenticateBorrower(email, password) {
    const borrower = await Borrower.findOne(
        { 
            where: { email } 
        }
    );

    if (!borrower || !(await bcrypt.compare(password, borrower.password))) {
        throw new LoginError('Invalid email or password');
    }
    const token = jwt.sign({ id: borrower.id }, config.app.jwt_secret, { expiresIn: '1h' });
    return { borrower, token };
}

async function registerBorrower(name, email, password, registerDate) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const borrower = await Borrower.create({ name, email, password: hashedPassword, registerDate });
    return borrower;
}

async function updateBorrower(id, name, email) {
    const borrower = await Borrower.findByPk(id);
    if (!borrower) {
        throw new NotFoundError("There is no borrowers with this id " + id);
    }
    borrower.name = name;
    borrower.email = email;
    await borrower.save();
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


export default { updateBorrower, deleteBorrower, getAllBorrowers, registerBorrower, authenticateBorrower }
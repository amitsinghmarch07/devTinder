const bcrypt = require("bcrypt");

const getEncryptPassword = async (plainPassword) => {
    const hashPassword = await bcrypt.hash(plainPassword, 10);
    return hashPassword;
};

const checkPassword = async (enteredPassword, hashedPassword) => {
    console.log(enteredPassword, hashedPassword);
    const isValid = await bcrypt.compare(enteredPassword, hashedPassword);
    console.log(isValid);
    return isValid
}

module.exports = {
    getEncryptPassword,
    checkPassword
}
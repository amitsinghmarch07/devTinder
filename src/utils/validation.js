const validator = require("validator");
const validateSignUpData = (req) => {
    console.log(req.body);
    const { firstName, lastName, email, age, gender, phoneNumber, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("please enter correct first or last name");
    }

    if (!validator.isEmail(email)) {
        throw new Error("please enter correct email");
    }

    if (!validator.isStrongPassword(password)) {
        throw new Error("please enter strong password");
    }

    if (!validator.isMobilePhone(phoneNumber)) {
        throw new Error("please enter correct phone number");
    }
};

module.exports = {
    validateSignUpData
}
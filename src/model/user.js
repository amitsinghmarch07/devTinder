const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 15
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Please enter valid emailid");
            }
        }

    },
    password: {
        type: String,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Please enter strong password");
            }
        }
    },
    phoneNumber: {
        type: Number
    },
    age: {
        type: Number
    },
    gender: {
        type: String,
        validate(value) {
            console.log(value);
            console.log(value.toLowerCase());
            if (!(["male", "female"].includes(value.toLowerCase()))) {
                throw new Error("gender is wrong");
            }
        }
    },
    photoUrl: {
        type: String,
        default: "https://pngtree.com/so/circle-default-avatar-icon"
    },
    about: {
        type: String,
        default: "this is the default description"
    }
}, {
    timestamps: true
})

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    return token
}

userSchema.methods.validatePassword = async function (enteredPassword) {
    const user = this;
    console.log(enteredPassword, user.password);
    const isValid = await bcrypt.compare(enteredPassword, user.password);
    console.log(isValid);
    return isValid
}
const User = mongoose.model("User", userSchema);

module.exports = User;
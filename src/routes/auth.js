const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const { getEncryptPassword, checkPassword } = require("../utils/password");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

authRouter = express.Router()

authRouter.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const { firstName, lastName, email, age, gender, phoneNumber, password } = req.body;
        console.log("sign up api called");
        console.log(req.body);
        console.log(password);
        const passwordHash = await getEncryptPassword(password);
        console.log(passwordHash);
        const user = new User({
            firstName,
            lastName,
            email,
            phoneNumber,
            gender,
            age,
            password: passwordHash
        });
        await user.save();
        res.status(200).send("User add successfully");
    } catch (err) {
        console.log(err);
        res.status(401).send(err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
        console.log("came here");
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        console.log(user);
        const isValidPassword = await user.validatePassword(password);
        console.log(isValidPassword);
        if (isValidPassword) {
            const token = await user.getJWT();
            res.cookie("token", token);
            res.status(200).send("Login success");
        } else {
            res.status(401).send("please enter correct password");
        }
    } catch (error) {
        res.status(401).send("Please enter correct password");
    }

});

authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout successful");
});

module.exports = authRouter;
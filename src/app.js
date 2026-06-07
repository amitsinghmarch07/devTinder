const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const connectDB = require("./config/database");
const User = require("./model/user");
const { validateSignUpData } = require("./utils/validation");
const { getEncryptPassword, checkPassword } = require("./utils/password");
const app = express();
app.use(express.json());

//~% check if the req body has no expected keys

const ALLOWED_UPDATES = [
    "firstName",
    "lastName",
    "phoneNumber",
    "gender",
    "age",
    "photoUrl",
    "about"
]
const isDataUpdateAllowed = (data) => {
    const isAllowed = Object.keys(data).every(
        (k) => {
            const isFlag = ALLOWED_UPDATES.includes(k);
            console.log(isFlag, k);
            return isFlag
        });
    return isAllowed
};

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        console.log(user);
        const isValidPassword = await checkPassword(password, user.password);
        console.log(isValidPassword);
        if (isValidPassword) {
            res.status(200).send("Login success");
        } else {
            res.status(401).send("please enter correct password");
        }
    } catch (error) {
        res.status(401).send("Please enter correct password");
    }

});

app.patch("/user/:userId", async (req, res) => {
    try {
        console.log(req.params.userId);
        console.log(req.body);
        if (!isDataUpdateAllowed(req.body)) {
            res.status(401).send("something went wrong. please check the data");
        }
        const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
            returnDocument: "before",
            runValidators: true
        });
        res.status(200).send(user);
    } catch (error) {
        res.status(401).send(error.message);
    }

});

connectDB()
    .then(() => {
        app.listen(7777, () => {
            console.log("listening on port number 7777")
        });
    })
    .catch((err) => {
        console.log(err);
    })

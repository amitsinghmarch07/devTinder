const express = require("express");
const User = require("../model/user");

const userRouter = express.Router();


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

userRouter.patch("/user/:userId", async (req, res) => {
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

module.exports = userRouter;
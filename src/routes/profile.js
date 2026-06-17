const express = require("express");
const User = require("../model/user");
const { userAuth } = require("../middlewares/auth");

const profileRouter = express.Router();

profileRouter.post("/profile", userAuth, async (req, res) => {
    try {
        if (!req.user) {
            throw new Error("User not exist");
        }
        res.status(200).send(req.user);
    } catch (error) {
        res.status(401).send("something went wrong");
    }
})
module.exports = profileRouter;
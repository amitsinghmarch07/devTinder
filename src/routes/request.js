const express = require("express");
const { userAuth } = require("../middlewares/auth");

router = express.Router();

router("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {

        const toUserId = req.params.toUserId;
        const fromUserId = req.user._id;

        console.log(fromUserId, toUserId)

    } catch (err) {
        res.status(400).send(err.message);
    }
});
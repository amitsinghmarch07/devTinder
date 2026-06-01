const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
    console.log("first response")
    next();
    res.send("first response sent")
}, (req, res, next) => {
    console.log("second response sent");
    // res.send("second response sent")
    next();
    res.send("second response")
});

app.listen(7777, () => {
    console.log("listening on port number 7777")
});

const express = require("express");

const app = express();

app.use("/users", (req, res, next) => {
    console.log("first response")
    next();
    res.send("first response sent")
});

app.get("/users", (req, res, next) => {
    console.log("this is the second route for users")
    next();
    res.send("second route is sending")
});

app.get("/users", (req, res) => {
    console.log("this is the third route for user")
    res.send("this is the third route");
});

app.listen(7777, () => {
    console.log("listening on port number 7777")
});

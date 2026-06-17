const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const userRouter = require("./routes/user");
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", userRouter);

connectDB()
    .then(() => {
        app.listen(7777, () => {
            console.log("listening on port number 7777")
        });
    })
    .catch((err) => {
        console.log(err);
    })

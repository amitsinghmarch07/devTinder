const jwt = require("jsonwebtoken");
const User = require("../model/user");

const userAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Please login");
        }
        console.log(req.cookies);
        console.log(token);
        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { id } = decodedToken;
        console.log(decodedToken);

        const user = await User.findById(id);
        console.log(user);

        if (!user) {
            throw new Error("User does not exist");
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        res.status(400).send("Error");
    }
}

module.exports = {
    userAuth
}
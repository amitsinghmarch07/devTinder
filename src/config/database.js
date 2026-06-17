const mongoose = require("mongoose")
require("dotenv").config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_SECRET);
        console.log("databse conected");
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = connectDB
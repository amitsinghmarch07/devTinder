const mongoose = require("mongoose")

const connectDB = async () => {
    console.log(process.env.DB_CONNECTION_SECRET);
    await mongoose.connect("mongodb+srv://amitdev7:AmitMarDev007@cluster0.gfftpz7.mongodb.net/devTinder");
    console.log("databse conected");
};

module.exports = connectDB
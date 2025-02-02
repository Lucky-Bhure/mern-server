const mongoose = require("mongoose");

// MongoDB URL from .env file
const URL = process.env.MONGODB_URL;

const connectDB = async() => {
    try {
        await mongoose.connect(URL);
        console.log("Connection successful to Database")
    } catch (error) {
        console.error("Database connection failed.")
        process.exit(0);
    }
}

module.exports = connectDB;
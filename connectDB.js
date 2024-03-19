require('dotenv').config();
const mongoose = require('mongoose');
const db_uri = process.env.DB_URI;

let connectDB = async () =>{
    await mongoose
    .connect(db_uri)
    .then(() => console.log("Connected to HotelDB"))
    .catch(() => console.log("Error connecting to MongoDB Atlas"));
}

//export this functionality
module.exports = connectDB;


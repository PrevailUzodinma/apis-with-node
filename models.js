const mongoose = require("mongoose");

let Roomtype = () => {
  // Define the Schema for the roomtype data
  const roomtypeSchema = new mongoose.Schema({
    name: String,
  });

  // Define roomtype model, to handle our CRUD operations
  const Roomtype = mongoose.model("Roomtype", roomtypeSchema);
};

let Room = () => {
  // Define the Schema for the room data
  const roomSchema = new mongoose.Schema({
    name: String,
    roomType: { type: mongoose.Schema.Types.ObjectId, ref: "Roomtype" },
    price: Number,
  });

  // Define room model, to handle our CRUD operations
  const Room = mongoose.model("Room", roomSchema);
};

module.exports = { Roomtype, Room };
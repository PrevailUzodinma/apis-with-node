const mongoose = require("mongoose");

let Roomtype = () => {
  // Define the Schema for the roomtype data
  const roomtypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
  }, {timestamps: true});

  // Define roomtype model, to handle our CRUD operations
  return mongoose.model("Roomtype", roomtypeSchema);
};

let Room = () => {
  // Define the Schema for the room data
  const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roomType:{
     type: mongoose.Schema.Types.ObjectId, 
     ref: "Roomtype",
     required: true
    },
    price:{
        type: Number,
        required: false,
        default: null
    }
    }, {timestamps: true})

  // Define room model, to handle our CRUD operations
  return mongoose.model("Room", roomSchema);
};

module.exports = { Roomtype, Room };
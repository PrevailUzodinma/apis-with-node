const mongoose = require("mongoose");

  // Define the Schema for the roomtype data
  const roomtypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
  });

  // Define roomtype model, to handle our CRUD operations
  let Roomtype = mongoose.model("Roomtype", roomtypeSchema);



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
    });

  // Define room model, to handle our CRUD operations
  let Room = mongoose.model("Room", roomSchema);


module.exports = { Roomtype, Room };
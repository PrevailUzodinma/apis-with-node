// Include every dependency installed
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

/* Set up the DataBase*/
mongoose.connect("mongodb://localhost/hotel");

// set up the Schema for the roomtype data
const roomtypeSchema = new mongoose.Schema({
  name: String,
});

// set up roomtype model, to handle our CRUD operations
const Roomtype = mongoose.model("Roomtype", roomtypeSchema);

// set up the Schema for the room data
const roomSchema = new mongoose.Schema({
  name: String,
  roomType: { type: mongoose.Schema.Types.ObjectId, ref: "Roomtype" },
  price: Number,
});

// set up room model, to handle our CRUD operations
const Room = mongoose.model("Room", roomSchema);

/* Time to set up my ROUTES */

// create a room-type
app.post("/api/v1/rooms-types", async(req, res) => {
    try{
        const data = await Roomtype.create(req.body);
        res.status(200).send({data});
    }
    catch(err){
        res.status(500).send("Something went wrong!");
    }

});

// get all room-types
app.get("/api/v1/room-types", async (req, res) => {
    try{
        const allRoomTypes = await Roomtype.find({});
        res.status(200).send({data: allRoomTypes});
    }
    catch(err){
        res.status(500).send("Something went wrong!")
    }
});

// create a room
app.post("/api/v1/rooms", async(req, res) => {
    const room = await Room.create(req.body);
    res.status(500).send({room})
});

// get all rooms

// edit a room by id
app.patch("/api/v1/rooms/:roomId", async (req, res) => {
// 
});


// Tell express to listen for port
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

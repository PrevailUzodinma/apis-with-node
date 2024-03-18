// Include every dependency installed
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const port = 3000;
const uri =
  "mongodb+srv://theiprevail:<password>@hoteldbcluster.5u3hlzd.mongodb.net/?retryWrites=true&w=majority&appName=HotelDBCluster";

//Allow requests from any origin
app.use(cors({
    origin: '*',
}))
/* Connect the DataBase*/
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to HotelDB"))
  .catch(() => console.log("Error connecting to MongoDB Atlas"));

// Define the Schema for the roomtype data
const roomtypeSchema = new mongoose.Schema({
  name: String,
});

// Define roomtype model, to handle our CRUD operations
const Roomtype = mongoose.model("Roomtype", roomtypeSchema);

// Define the Schema for the room data
const roomSchema = new mongoose.Schema({
  name: String,
  roomType: { type: mongoose.Schema.Types.ObjectId, ref: "Roomtype" },
  price: Number,
});

// Define room model, to handle our CRUD operations
const Room = mongoose.model("Room", roomSchema);

/* Time to set up my ROUTES */

// create a room-type
app.post("/api/v1/rooms-types", async (req, res) => {
  try {
    const data = await Roomtype.create(req.body);
    if (!data) {
      res.status(400).send({ error: "Failed to create room-type" });
    } else {
      res.status(200).send({ data });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// get all room-types
app.get("/api/v1/room-types", async (req, res) => {
  try {
    const allRoomTypes = await Roomtype.find({});
    if (!allRoomTypes) {
      res.status(404).send({ error: "Could not retrieve room-types" });
    } else {
      res.status(200).send({ data: allRoomTypes });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// create a room
app.post("/api/v1/rooms", async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    if (!newRoom) {
      res.status(400).send({ error: "Failed to create room" });
    } else {
      res.status(200).send({ newRoom });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// get all rooms
/* Hang on, i'm still figuring out how to do this */

// edit a room by id
app.patch("/api/v1/rooms/:roomId", async (req, res) => {
  //Extract the ID of the room, I want to update from the request parameter
  const { roomId } = req.params;

  //Extract the update data from request body sent by client
  const partialRoomData = req.body;

  // Update the existing data with the new data
  try {
    const updatedRoom = await Room.findByIdAndUpdate(roomId, partialRoomData, {
      new: true,
    });
    if (!updatedRoom) {
      res.status(400).send({ error: "Could not update room info!" });
    } else {
      res.status(200).send({ data: updatedRoom });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

//Delete a room using its id
app.delete("/api/v1/rooms/:roomId", async (req, res) => {
  //Extract ID of the room to delete using request parameters
  const { roomId } = req.params;
  //delete the room with the extracted ID
  try {
    await Room.findByIdAndDelete(roomId);
    //send a success response
    res.status(200).send({ message: "Room deleted successfully" });
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// Get/fetch room by ID
app.get("/api/v1/rooms/:roomId", async (req, res) => {
  // Extract ID of specific room to get from request parameters
  const { roomId } = req.params;
  //get room by ID
  try {
    const room = await Room.findById({ roomId });
    if (!room) {
      res.status(404).send({ error: "Could not find room with provided ID" });
    } else {
      res.status(200).send({ room });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// Tell express to listen for port
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

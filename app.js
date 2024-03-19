// Include every dependency installed
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const connectDB = require("./connectDB");
const { Roomtype, Room } = require("./models");
const port = 4890;

//Allow requests from any origin
app.use(cors({}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Connect the DataBase
connectDB();

/* Time to set up my ROUTES */
//base url
app.get("/", (req, res) => {
  res.send("Welcome to hotel management api");
});

// create a room-type
app.post("/api/v1/rooms-types", async (req, res) => {
  try {
    // Extract the data from the client using request.body
    const data = req.body;
    const newRoomType = await Roomtype.create(data);
    if (!newRoomType) {
      res.status(400).send({ error: "Failed to create room-type" });
    } else {
      res.status(200).send({ newRoomType });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// get all room-types
app.get("/api/v1/room-types", async (req, res) => {
  try {
    const allRoomTypes = await Roomtype.find({});
    res.status(200).send({ data: allRoomTypes });
    }
  catch (error) {
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
      res.status(200).send({ data: room });
    }
  catch (error) {
    res.status(500).send({ error: "Internal server error" });
  }
});

// Tell express to listen for port
app.listen(port, () => {
  console.log(`Server started at ${port}`);
});

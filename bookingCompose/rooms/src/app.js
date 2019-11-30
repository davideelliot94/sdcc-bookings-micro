const express = require("express");
const Room = require("./models/rooms_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "I'm rooms service, I'm up!" });
});

app.get("/api/v1/rooms", async (req, res) => {
  const rooms = await Room.find({});
  res.json(rooms);
});

app.post("/api/v1/roomsById", async (req, res) => {
  const id = req.body.id;
  const rooms = await Room.findById(id);
  res.json(rooms);
});

app.post("/api/v1/roomsByName", async (req, res) => {
  const rooms = await Room.findOne({name: req.body.name});
  res.json(rooms);
});

app.post("/api/v1/roomsByCapacity", async (req, res) => {
  const rooms = await Room.findOne({capacity: req.body.capacity});
  res.json(rooms);
});

app.post("/api/v1/saveRoom", async (req, res) => {

  const room = new Room({ name: req.body.name, capacity: req.body.capacity});
  const savedRoom = await room.save();
  res.json(savedRoom);
});


module.exports = app;

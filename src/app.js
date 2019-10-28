const express = require("express");
const Room = require("./models/rooms_model");
const Booking = require("./models/booking_model");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.json({ msg: "I'm booking service, I'm up!" });
});

app.post("/api/v1/rooms", async (req, res) => {
    const rooms = await Room.find({});
    res.json(rooms);
});

app.get("/api/v1/roomsById", async (req, res) => {
    const rooms = await Room.findOne({ "id": req.body.stringify()});
    res.json(rooms);
});

app.get("/api/v1/roomsByName", async (req, res) => {
    const rooms = await Room.findOne({ "name": req.body.stringify()});
    res.json(rooms);
});

app.get("/api/v1/bookings", async (req, res) => {
    const bookings = await Booking.find({});
    res.json(bookings);
});

app.post("/api/v1/bookingsById", async (req, res) => {
    const bookings = await Booking.findOne({ "id": req.body.stringify()});
    res.json(bookings);
});

app.post("/api/v1/bookingsByDate", async (req, res) => {
    const bookings = await Booking.find({ "date": req.body.date.stringify()});
    res.json(bookings);
});
/*
app.post("/api/v1/bookingsByRoomId", async (req, res) => {
    const bookings = await Booking.find({ "Room": req.body.rid.stringify()});
    res.json(bookings);
});

app.post("/api/v1/bookingsByTeaching", async (req, res) => {
    const bookings = await Booking.find({ "teaching": req.body.teach.stringify()});
    res.json(bookings);
});


app.post("/api/v1/bookingsByRoomAndDate", async (req, res) => {
    const bookingByRoom = await Booking.find({ "RoomId": req.body.rid.stringify()});
    const bookings = await Booking.find({ "startDate": bookingByRoom.startDate,
                                            "endDate": bookingByRoom.endDate});
    res.json(bookings);
});
*/


  
app.post("/api/v1/makeBooking", async (req, res) => {
    const booking = new Booking({ id: req.body.id,
        timestamp: req.body.now, 
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        room: req.body.room,
        teaching: req.body.teach
        
    });

    const savedBooking = await booking.save();
    res.json("La prenotazione "+savedBooking.id + " è avvenuta con successo");
});
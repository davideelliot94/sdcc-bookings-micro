var express = require("express");
var Room = require("./models/rooms_model");
var Booking = require("./models/booking_model");
var Teaching = require("./models/teaching_model");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
var jwt = require('jsonwebtoken');
var verifyOptions = {
    algorithm:  ["RS256"]
};
var kid = "6jqcZFFzaqP04u85tWTfAw55ls6PTbiABoDj/5I6LPQ=";
app.use(cors());
app.use(bodyParser.json());

/**
 *  PRESENTATION
*/

app.use(function (req, res, next) {
    // do something with the request
    var jwtToken;
    console.log('testing');
    var nweText = req.body;
    console.log('body is: ' + JSON.stringify(nweText));

    if(nweText !== null && nweText !== undefined) {
        jwtToken = /*JSON.parse(nweText).jwtToken;*/nweText.jwtToken;
        var jwtDecode = require('jwt-decode');
        var decoded = jwtDecode(jwtToken);
        console.log('decoded: ' + JSON.stringify(decoded));
        var jwkToPem = require('jwk-to-pem');
        var pem = jwkToPem(decoded);
        jwt.verify(jwtToken, pem, { algorithms: ['RS256'] }, function(err, decodedToken) {
        });
        //var decoded = jwt.verify(jwtToken,kid);
        console.log('token is: ' + JSON.stringify(jwtToken));
    }

    //console.log('nwe is: ' + nwe);
    next(); // MUST call this or the routes will not be hit
});



app.get("/", (req, res) => {
    res.json({ msg: "I'm booking service, I'm up! " });
});

/**
 *  ROOMS
*/

app.get("/api/v1/rooms", async (req, res) => {
    const rooms = await Room.find({});
    res.json(rooms);
});

app.post("/api/v1/roomsById", async (req, res) => {
    var id = req.body.id;
    const rooms = await Room.findById(id);
    res.json(rooms);
});

app.post("/api/v1/roomsByName", async (req, res) => {
    const rooms = await Room.findOne({ "name": req.body.name});
    res.json(rooms);
});

/**
 *  BOOKINGS
*/

app.get("/api/v1/bookings", async (req, res) => {
    const bookings = await Booking.find({});
    res.json(bookings);
});

app.post("/api/v1/bookingsById", async (req, res) => {
    id = req.body.id;
    const bookings = await Booking.findById(id);
    res.json(bookings);
});

app.post("/api/v1/bookingsByDate", async (req, res) => {
    const bookings = await Booking.find({ "date": req.body.date});
    res.json(bookings);
});


  
app.post("/api/v1/saveBooking", async (req, res) => {
    console.log('got request');
    const booking = new Booking({
        jwtToken: req.body.jwtToken,
        id: req.body.id,
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

/**
 *  TEACHING
*/

app.get("/api/v1/teachings", async (req, res) => {
    const teachings = await Teaching.find({});
    res.json(teachings);
});

app.post("/api/v1/teachingsById", async (req, res) => {

    id = req.body.id;
    const teaching = await Teaching.findById(id);
    res.json(teaching);
});


module.exports = app;


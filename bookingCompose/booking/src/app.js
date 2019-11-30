const fetch = require("node-fetch");
const express = require("express");
const Room = require("./models/rooms_model");
const Booking = require("./models/booking_model");
const Teaching = require("./models/teaching_model");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());



app.get("/", (req, res) => {
  res.json({ msg: "I'm booking service, Up & Running" });
});

app.get("/api/v1/bookings", async (req, res) => {
  const bookings = await Booking.find({});
  if(bookings.length > 0) {
    res.json(bookings);
  }
  else{
    res.json("No Bookings");
  }
  
});

app.post("/api/v1/bookingsById", async (req, res) => {
  const id = req.body.id;
  const bookings = await Booking.findById(id);
  
  res.json(bookings);
});

app.post("/api/v1/bookingsByDate", async (req, res) => {
  const bookings = await Booking.find({ "date": req.body.date});
  res.json(bookings);
});

/*
app.post("/api/v1/bookingsByRoomId", async (req, res) => {
  
  var bookings;
  try{
    const RoomIdPromise = fetch("http://rooms:8080/api/v1/roomsById", {
      method: 'POST',
      body: 
      { 
        id : req.body.id 
      },
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    });

    const response = await Promise.RoomIdPromise;
    const gotroom = await response.json();
    bookings = await Booking.find({ room: gotroom.name });
    
  } catch (e){
    res.status(500).json(e);
  }
  res.json(bookings);
});*/



app.post("/api/v1/bookingsByTeaching", async (req, res) => {
  
  const bookings = await Booking.find({ "teaching.name" : req.body.name });

  res.json(bookings);
});

app.post("/api/v1/bookingsByProfId", async (req, res) => {
  
  const bookings = await Booking.find({ "teaching.id_prof" : req.body.name });

  res.json(bookings);
});


app.post("/api/v1/bookingsByRoomName", async (req, res) => {
  
  var name = req.body.name;

  const bookings = await Booking.find({ room: name });
    
  res.json(bookings);
});


app.post("/api/v1/bookingsByUserId", async (req, res) => {

  var usr = req.body.user;

  const bookings = await Booking.find({ id_user: usr });

  res.json(bookings);
});


app.post("/api/v1/bookingsByRoomAndDate", async (req, res) => {
      
  const bookings = await Booking.find({ room: req.body.room, date: req.body.date});
  
  res.json(bookings);
});


app.post("/api/v1/bookingsByRoomAndTimeSlot", async (req, res) => {
  
  const bookings = await Booking.find({ room: req.body.name, startDate: req.body.startdate , endDate: req.body.enddate});

  res.json(bookings);
});

app.post("/api/v1/getBookingByTimeSlot", async (req,res) => {

  const bookings = await Booking.find({startDate: req.startdate,
                                        endDate: req.enddate});

  res.json(bookings);
  
});


app.post("/api/v1/makeBooking", async (req, res) => {

  var bookings;
  var booking;

  bookings = await Booking.find({ "room": req.body.name });
  
  if(bookings.length > 0){
    var canInsert = 1; // 0 se non posso inserire, 1 se posso
    bookings.forEach( b => {

      if( b.start == req.body.start ){
          canInsert = 0;
        
      }
      if( req.body.start < b.start && req.body.end > b.start){
        canInsert = 0;
        
      }
      if( req.body.start > b.start && b.end > req.body.start ){
        canInsert = 0;
        
      }
      
    });

    
    if( canInsert == 1 ){
    
        booking = new Booking({
            timestamp: Date.now(), 
            date: req.body.date,
            start: req.body.start,
            end: req.body.end,
            id_user: req.body.user,
            room: req.body.room,
            teaching: req.body.teach
        
        });

        const savedBooking = booking.save();
        res.json("La prenotazione è avvenuta con successo");
      }
      else{
        res.json("Impossibile effettuare la prenotazione");
      }

  }
  else{
    
    booking = new Booking({
        timestamp: Date.now(), 
        date: req.body.date,
        start: req.body.start,
        end: req.body.end,
        id_user: req.body.user,
        room: req.body.room,
        teaching: req.body.teach
    
    });

    const savedBooking = booking.save();
    res.json("La prenotazione è avvenuta con successo");
      
  }
  
});



module.exports = app;

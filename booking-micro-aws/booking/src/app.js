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
  res.json(bookings);
});

app.post("/api/v1/bookingsById", async (req, res) => {
  const id = req.body.stringify();
  const bookings = await Booking.findById(id);
  
  res.json(bookings);
});

app.post("/api/v1/bookingsByDate", async (req, res) => {
  const bookings = await Booking.find({ "date": req.body.date});
  res.json(bookings);
});


app.post("/api/v1/bookingsByRoomId", async (req, res) => {
  
  var bookings;
  try{
    const RoomIdPromise = fetch("http://rooms:8080/api/v1/roomsById", {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    });

    const response = await Promise.RoomIdPromise;
    const Room = await response.json();
    bookings = await Booking.find({ "room": Room });
    
  } catch (e){
    res.status(500).json(e);
  }
  res.json(bookings);
});


app.post("/api/v1/bookingsByUserId", async (req, res) => {

  var teachings;
  try{
    const teachingsPromise = fetch("http://teaching:8080/api/v1/teachingByUserId", {
      method: 'POST',
      body: JSON.stringify(req.body.value),
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    });

    const response = await Promise.teachingsPromise;
    teachings = await response.json();
    
  } catch (e){
    res.status(500).json(e);
  }

  var bookings = [];
  teachings.forEach(t => {
    const booking = Booking.find({ "teaching": t });
    bookings.push(booking);

  });

  res.json(bookings);
});


app.post("/api/v1/bookingsByRoomAndDate", async (req, res) => {
  
  var bookings;
  try{
    const RoomIdPromise = fetch("http://rooms:8080/api/v1/roomsById", {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    });

    const response = await Promise.RoomIdPromise;
    const Room = await response.json();
    bookings = await Booking.find({ "room": Room,"startDate": bookingByRoom.startDate,
                                          "endDate": bookingByRoom.endDate});
    
  } catch (e){
    res.status(500).json(e);
  }
  
  res.json(bookings);
});

app.post("/api/v1/getBookingByTimeSlot", async (req,res) => {

  const bookings = await Booking.find({"startDate": req.startDate,
                                        "endDate": req.endDate});

  res.json(bookings);
  
});


app.post("/api/v1/makeBooking", async (req, res) => {

  var bookings;
  try{
    const RoomIdPromise = fetch("http://rooms:8080/api/v1/roomsById", {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: {
          'Access-Control-Allow-Origin': '*',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    });

    const response = await Promise.RoomIdPromise;
    const Room = await response.json();
    bookings = await Booking.find({ "room": Room });
    
  } catch (e){
    res.status(500).json(e);
  }
  
  var canInsert = 1; // 0 se non posso inserire, 1 se posso
  bookings.forEach( b => {

    if( b.startDate == req.body.startDate ){
        canInsert = 0;
        
    }
    if( req.body.startDate < b.startDate && req.body.endDate > b.startDate){
      canInsert = 0;
      
    }
    if( req.body.startDate > b.startDate && b.endDate > req.body.startDate ){
      canInsert = 0;
      
    }
    
  });

  var booking;
  if( canInsert == 1 ){
  
      booking = new Booking({ id: req.body.id,
          timestamp: req.body.now, 
          date: req.body.date,
          start: req.body.start,
          end: req.body.end,
          room: req.body.room,
          teaching: req.body.teach
      
      });
    }
  const savedBooking = await booking.save();
  res.json("La prenotazione "+savedBooking.id + " è avvenuta con successo");
});



module.exports = app;

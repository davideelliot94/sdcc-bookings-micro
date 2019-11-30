const app = require("./src/app");
const { DB_URI } = require("./src/config");
const Room = require("./src/models/rooms_model");
const mongoose = require("mongoose");
var assert = require('assert');
const fs = require('fs');
mongoose.connect(DB_URI);



function loadRooms(){

  let rawdata = fs.readFileSync('rooms.json');
  let rooms = JSON.parse(rawdata);

  Room.collection.insertMany(rooms, function(err,r) {
          assert.equal(null, err);    
          console.log(r);
      });


    console.log(rooms); 
}



app.listen(3000, () => {
  
 
  loadRooms();

  console.log("running on port 3000");
  console.log("--------------------------");
});

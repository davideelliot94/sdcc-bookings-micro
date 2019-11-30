const app = require("./src/app");
const { DB_URI } = require("./src/config");
const Teaching = require("./src/models/teaching_model");
const mongoose = require("mongoose");
var assert = require('assert');
const fs = require('fs');
mongoose.connect(DB_URI);


function loadTeachings(){

  let rawdata = fs.readFileSync('teachings.json');
  let teachings = JSON.parse(rawdata);

  Teaching.collection.insertMany(teachings, function(err,r) {
          assert.equal(null, err);    
          console.log(r);
      });


  console.log(teachings); 
  

}


app.listen(3000, () => {
  
  
  loadTeachings();
  
  console.log("running on port 3000");
  console.log("--------------------------");
});

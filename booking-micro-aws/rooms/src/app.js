const express = require("express");
const Room = require("./models/rooms_model");
const app = express();
const { DB_URI } = require("./config/index");
const bodyParser = require("body-parser");
var client;



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
  const rooms = await Room.findOne({ "name": req.body.name});
  res.json(rooms);
});

app.post("/api/v1/saveRoom", async (req, res) => {

    if(client===null || client ===undefined){
        var MongoClient = require('mongodb').MongoClient,
        f = require('util').format,
        fs = require('fs');
        
        //Specify the Amazon DocumentDB cert
        var ca = [fs.readFileSync(__dirname + "/rds-combined-ca-bundle.pem")];
        console.log(ca.toString());
        
        //Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set, 
        //  and specify the read preference as secondary preferred
        client = MongoClient.connect(
          DB_URI, 
        { 
        sslValidate: true,
        sslCA:ca,
        useNewUrlParser: true
        },
        function(err, client) {
          if(err)
              throw err;
           
          //Specify the database to be used
          db = client.db('test');
          
          //Specify the collection to be used
          Room = db.collection('Room');  
        
          //Insert a single document
          Room.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
            //Find the document that was previously written
            Room.findOne({'hello':'Amazon DocumentDB'}, function(err, result){
              //Print the result to the screen
              console.log(result);
              
              //Close the connection
              client.close()
      
          
              
            });
            
        });
        
        
        });
      }
      else{

        var db = client.db('test');
   
        //Specify the collection to be used
        var Room = db.collection('Room');  
      
      
      
        Room.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
          //Find the document that was previously written
          Room.findOne({'hello':'Amazon DocumentDB'}, function(err, result){
            //Print the result to the screen
            console.log(result);
            
            //Close the connection
           // client.close()
      
         
            
          });
          
       });
        


      }


});

module.exports = app;

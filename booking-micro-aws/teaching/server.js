const app = require("./src/app");
const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");



var MongoClient = require('mongodb').MongoClient,
f = require('util').format,
fs = require('fs');

//Specify the Amazon DocumentDB cert
var ca = [fs.readFileSync("rds-combined-ca-bundle.pem")];

//Create a MongoDB client, open a connection to Amazon DocumentDB as a replica set, 
//  and specify the read preference as secondary preferred
var client = MongoClient.connect(
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
  col = db.collection('Teaching');

  //Insert a single document
  col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
    //Find the document that was previously written
    col.findOne({'hello':'Amazon DocumentDB'}, function(err, result){
      //Print the result to the screen
      console.log(result);
      
      //Close the connection
      client.close()
    });
 });
});


app.listen(3000, () => {
  console.log("running on port 3000");
  console.log("--------------------------");
});
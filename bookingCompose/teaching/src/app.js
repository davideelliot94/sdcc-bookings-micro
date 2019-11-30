const express = require("express");
const Teaching = require("./models/teaching_model");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "I'm teachings service, I'm up!" });
});


app.get("/api/v1/teachings", async (req, res) => {
  const teachings = await Teaching.find({});
  res.json(teachings);
});

app.post("/api/v1/teachingsById", async (req, res) => {

  const id = req.body.id;
  const teaching = await Teaching.findById(id);
  res.json(teaching);
});

app.post("/api/v1/teachingsByStudent", async (req, res) => {

  const id = req.body.value;  
  const teaching = await Teaching.find({id_student: id});
  res.json(teaching);
});

app.post("/api/v1/teachingsByProfId", async (req, res) => {

  const id = req.body.value;  
  const teaching = await Teaching.find({id_prof: id});
  res.json(teaching);
});

app.post("/api/v1/teachingsByName", async (req, res) => {

  const name = req.body.name;  
  const teaching = await Teaching.find({name: name});
  res.json(teaching);
});



//da errore "cannot read property push of undefined"
app.post("/api/v1/updateTeaching", async (req, res) => {
  const t = await Teaching.findOne({ name : req.body.name });
  var temp = [];
  var Studs = [];
  console.log("Array iniziale"+ t.id_student);
  temp = t.id_student;
  Studs = temp.concat(req.body.newstud);
  
  console.log("Printing studs\n" + Studs);

  
  Teaching.update(
    { 
      "_id": t._id
    },
    { 
      $set:{
        id_student : Studs
      }
    }, function(err, affected, resp) {
    if(err){
      res.status(500);
      res.send();
      throw err;
    }
    
    res.json("Update effettuato");
  });
  
});

module.exports = app;

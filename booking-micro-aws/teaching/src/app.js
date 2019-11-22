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

app.post("/api/v1/teachingsByUserId", async (req, res) => {

  const id = req.body.value;
  const teaching = await Teaching.find({"id_student": id});
  res.json(teaching);
});


app.post("/api/v1/saveTeaching", async (req, res) => {
  const teaching = new Teaching({ name: req.body.name });
  const savedTeaching = await teaching.save();
  res.json(savedTeaching);
});

module.exports = app;

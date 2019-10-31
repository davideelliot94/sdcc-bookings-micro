const app = require("./src/app");
const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");
mongoose.connect(DB_URI);

//fai connessione a db

app.listen(8080, () => {
    console.log("running on port 8080");
    console.log("--------------------------");
});


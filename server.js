const app = require("./src/app");
const { DB_URI } = require("./src/config");
const mongoose = require("mongoose");
//mongoose.connect(DB_URI);

/*mongoose.connect(DB_URI, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});*/                           //MI DA ERRORE, FORSE PERCHÉ MI MANCA IL CONTAINER?

//fai connessione a db

app.listen(3000, () => {
    console.log("running on port 8080");
    console.log("--------------------------");
});


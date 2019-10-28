const app = require("./src/app");
const { DB_URI } = require("./src/config");

//fai connessione a db

app.listen(8080, () => {
    console.log("running on port 8080");
    console.log("--------------------------");
});


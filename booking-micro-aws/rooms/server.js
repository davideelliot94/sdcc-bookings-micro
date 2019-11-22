const app = require("./src/app");
const client = require("./src/config/connection");


app.listen(3000, () => {
  console.log("running on port 3000");
  console.log("--------------------------");
});

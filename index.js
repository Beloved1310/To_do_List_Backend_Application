//get the function name from the db.js file which is exported

//run the function call

//install the express and load the nodejs application
const express = require("express");
const app = express();
const {PORT} = require('./config');
const connectToMongo = require("./db");
var cors = require('cors')

app.use(cors({ origin: "*" }));
app.use(express.json()); 
//middle ware to use json
//Available routes

connectToMongo();
// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/auth", require("./routes/demo"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todo",require("./routes/todotask"));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
